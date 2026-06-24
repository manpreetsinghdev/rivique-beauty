"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

   // Admin Login
if (
  email === "admin@rivique.com" &&
  password === "admin123"
) {
  localStorage.setItem("adminLoggedIn", "true");
  window.location.href = "/dashboard";
  return;
}

// Vendor Login
if (
  email === "vendor@rivique.com" &&
  password === "123456"
) {
  localStorage.setItem("vendorLoggedIn", "true");

  window.location.href =
    "/dashboard/bf77f0e9-0cb7-43a1-a681-f5631a0627af";

  return;
 }
setError("Invalid email or password");
}
  return (
    <div className="max-w-md mx-auto py-20 px-6">
      <h1 className="font-serif text-4xl text-ink mb-3">
        Sign In
      </h1>

      <p className="text-ink-400 mb-8">
        Welcome back. Please sign in to continue.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-luxury">
            Email
          </label>

          <input
            type="email"
            className="input-luxury w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="label-luxury">
            Password
          </label>

          <input
            type="password"
            className="input-luxury w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-luxury w-full"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}