// src/app/components/AuthForm.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Input from "./AuthInput";

export default function AuthForm() {
  const { signin, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await signin(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    setError("");
    try {
      await signup(email, password);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login / Signup</h1>

      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />

      <div className="flex gap-2 mt-4">
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <button onClick={handleSignup} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Signup
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
