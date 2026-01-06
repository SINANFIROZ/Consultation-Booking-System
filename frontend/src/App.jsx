import { useState } from "react";
import Admin from "./pages/Admin";
import User from "./pages/User";

export default function App() {
  const [role, setRole] = useState("user");

  const email =
    role === "admin"
      ? "testuser@example.com"
      : "normaluser@example.com";

  return (
    <div>
      <h1>Consultation Booking System</h1>

      <label>
        Select Role:&nbsp;
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <hr />

      {role === "admin" ? (
        <Admin email={email} />
      ) : (
        <User email={email} />
      )}
    </div>
  );
}
