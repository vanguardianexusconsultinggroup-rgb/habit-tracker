import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertHabitSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Get current user
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get all habits for current user
  app.get("/api/habits", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const habits = await storage.getHabitsByUser(userId);
      
      // Get stats for each habit
      const habitsWithStats = await Promise.all(
        habits.map(async (habit) => {
          const stats = await storage.getHabitStats(habit.id);
          return { ...habit, ...stats };
        })
      );
      
      res.json(habitsWithStats);
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ message: "Failed to fetch habits" });
    }
  });

  // Create a new habit
  app.post("/api/habits", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const parsed = insertHabitSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid habit data", errors: parsed.error.errors });
      }

      const habit = await storage.createHabit({
        userId,
        name: parsed.data.name,
      });
      
      res.status(201).json({ ...habit, streak: 0, totalCompletions: 0 });
    } catch (error) {
      console.error("Error creating habit:", error);
      res.status(500).json({ message: "Failed to create habit" });
    }
  });

  // Update a habit
  app.patch("/api/habits/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const habitId = parseInt(req.params.id);
      const { name } = req.body;

      if (!name || typeof name !== "string") {
        return res.status(400).json({ message: "Name is required" });
      }

      const habit = await storage.updateHabit(habitId, userId, name);
      
      if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      const stats = await storage.getHabitStats(habitId);
      res.json({ ...habit, ...stats });
    } catch (error) {
      console.error("Error updating habit:", error);
      res.status(500).json({ message: "Failed to update habit" });
    }
  });

  // Delete a habit
  app.delete("/api/habits/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const habitId = parseInt(req.params.id);

      const deleted = await storage.deleteHabit(habitId, userId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Habit not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting habit:", error);
      res.status(500).json({ message: "Failed to delete habit" });
    }
  });

  // Get completions for a date range
  app.get("/api/completions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ message: "startDate and endDate are required" });
      }

      const completions = await storage.getCompletionsByUserAndDateRange(
        userId,
        startDate as string,
        endDate as string
      );

      res.json(completions);
    } catch (error) {
      console.error("Error fetching completions:", error);
      res.status(500).json({ message: "Failed to fetch completions" });
    }
  });

  // Toggle completion for a habit on a specific date
  app.post("/api/habits/:id/toggle", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const habitId = parseInt(req.params.id);
      const { date } = req.body;

      if (!date) {
        return res.status(400).json({ message: "Date is required" });
      }

      // Verify habit belongs to user
      const habit = await storage.getHabit(habitId, userId);
      if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      const isCompleted = await storage.toggleCompletion(habitId, date);
      const stats = await storage.getHabitStats(habitId);
      
      res.json({ isCompleted, ...stats });
    } catch (error) {
      console.error("Error toggling completion:", error);
      res.status(500).json({ message: "Failed to toggle completion" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
