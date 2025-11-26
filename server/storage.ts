import {
  users,
  habits,
  habitCompletions,
  type User,
  type UpsertUser,
  type Habit,
  type InsertHabit,
  type HabitCompletion,
  type InsertHabitCompletion,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc, sql as drizzleSql } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Habit operations
  getHabitsByUser(userId: string): Promise<Habit[]>;
  getHabit(id: number, userId: string): Promise<Habit | undefined>;
  createHabit(habit: InsertHabit): Promise<Habit>;
  updateHabit(id: number, userId: string, name: string): Promise<Habit | undefined>;
  deleteHabit(id: number, userId: string): Promise<boolean>;

  // Habit completion operations
  getCompletionsByHabitAndDateRange(
    habitId: number,
    startDate: string,
    endDate: string
  ): Promise<HabitCompletion[]>;
  getCompletionsByUserAndDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<{ habitId: number; completedDate: string }[]>;
  toggleCompletion(habitId: number, completedDate: string): Promise<boolean>;
  getHabitStats(habitId: number): Promise<{ streak: number; totalCompletions: number }>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Habit operations
  async getHabitsByUser(userId: string): Promise<Habit[]> {
    return await db
      .select()
      .from(habits)
      .where(eq(habits.userId, userId))
      .orderBy(habits.createdAt);
  }

  async getHabit(id: number, userId: string): Promise<Habit | undefined> {
    const [habit] = await db
      .select()
      .from(habits)
      .where(and(eq(habits.id, id), eq(habits.userId, userId)));
    return habit;
  }

  async createHabit(habit: InsertHabit): Promise<Habit> {
    const [newHabit] = await db.insert(habits).values(habit).returning();
    return newHabit;
  }

  async updateHabit(id: number, userId: string, name: string): Promise<Habit | undefined> {
    const [updated] = await db
      .update(habits)
      .set({ name })
      .where(and(eq(habits.id, id), eq(habits.userId, userId)))
      .returning();
    return updated;
  }

  async deleteHabit(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(habits)
      .where(and(eq(habits.id, id), eq(habits.userId, userId)))
      .returning();
    return result.length > 0;
  }

  // Habit completion operations
  async getCompletionsByHabitAndDateRange(
    habitId: number,
    startDate: string,
    endDate: string
  ): Promise<HabitCompletion[]> {
    return await db
      .select()
      .from(habitCompletions)
      .where(
        and(
          eq(habitCompletions.habitId, habitId),
          gte(habitCompletions.completedDate, startDate),
          lte(habitCompletions.completedDate, endDate)
        )
      );
  }

  async getCompletionsByUserAndDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<{ habitId: number; completedDate: string }[]> {
    const results = await db
      .select({
        habitId: habitCompletions.habitId,
        completedDate: habitCompletions.completedDate,
      })
      .from(habitCompletions)
      .innerJoin(habits, eq(habitCompletions.habitId, habits.id))
      .where(
        and(
          eq(habits.userId, userId),
          gte(habitCompletions.completedDate, startDate),
          lte(habitCompletions.completedDate, endDate)
        )
      );
    return results;
  }

  async toggleCompletion(habitId: number, completedDate: string): Promise<boolean> {
    // Check if completion exists
    const [existing] = await db
      .select()
      .from(habitCompletions)
      .where(
        and(
          eq(habitCompletions.habitId, habitId),
          eq(habitCompletions.completedDate, completedDate)
        )
      );

    if (existing) {
      // Remove completion
      await db
        .delete(habitCompletions)
        .where(eq(habitCompletions.id, existing.id));
      return false; // Now uncompleted
    } else {
      // Add completion
      await db.insert(habitCompletions).values({
        habitId,
        completedDate,
      });
      return true; // Now completed
    }
  }

  async getHabitStats(habitId: number): Promise<{ streak: number; totalCompletions: number }> {
    // Get total completions
    const completions = await db
      .select()
      .from(habitCompletions)
      .where(eq(habitCompletions.habitId, habitId))
      .orderBy(desc(habitCompletions.completedDate));

    const totalCompletions = completions.length;

    // Calculate streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completionDates = new Set(
      completions.map((c) => c.completedDate)
    );

    // Start from today and go backwards
    const checkDate = new Date(today);
    
    // If today is not completed, start from yesterday
    const todayStr = checkDate.toISOString().split("T")[0];
    if (!completionDates.has(todayStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (completionDates.has(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return { streak, totalCompletions };
  }
}

export const storage = new DatabaseStorage();
