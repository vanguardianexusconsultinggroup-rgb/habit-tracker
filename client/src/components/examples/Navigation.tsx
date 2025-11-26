import { Router } from "wouter";
import Navigation from "../Navigation";

export default function NavigationExample() {
  return (
    <Router>
      <Navigation 
        username="usuario@email.com" 
        onLogout={() => console.log('Logout clicked')} 
      />
    </Router>
  );
}
