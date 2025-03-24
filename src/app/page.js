"use client";

import React from "react";

export default function Home() {
  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Important: credentials must be "include" so the browser
        // will accept any cookies from the same domain.
        credentials: "include",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <button onClick={handleLogin}>Call login API here</button>
    </div>
  );
}