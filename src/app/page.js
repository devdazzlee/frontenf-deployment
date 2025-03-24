"use client";

import React from "react";

export default function Home() {
  const handleLogin = async () => {
    try {
      const response = await fetch("https://test-cookies-server.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are sent/received
        body: JSON.stringify({
          email: "test@example.com", // Dummy email from your server's users array
          password: "password123",   // Dummy password from your server's users array
        }),
      });

      if (!response.ok) {
        // Handle error response
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        return;
      }

      // If login is successful, the refresh token cookie is set automatically
      const data = await response.json();
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={() => handleLogin()}>
        Call login API here
      </button>
    </div>
  );
}
