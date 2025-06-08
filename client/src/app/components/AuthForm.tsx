"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Input from "./AuthInput";

export default function AuthForm() {
  const { signin, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [support, setSupport] = useState(false);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [timer, setTimer] = useState<number>(0);

  // Таймер автоматичного розблокування
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0 && status) {
      setStatus(false);
      setCount(0);
    }

    return () => clearInterval(interval);
  }, [status, timer]);

  const handleLogin = async () => {
    setError("");
    try {
      await signin(email, password);
    } catch (err: any) {
      if (err.message?.toLowerCase().includes("incorrect password")) {
        setSupport(true);
        setCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            setStatus(true);
            setTimer(30); // 30 секунд блокування
          }
          return newCount;
        });
      }

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

      <Input status={status} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input status={status} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={status}
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={status}
        >
          Signup
        </button>
      </div>

      {status && timer > 0 && (
        <p className="text-red-500 mt-2">Too many attempts. Try again in {timer}s.</p>
      )}

      {support && !status && (
        <button
          className="text-green-500 mt-4"
          onClick={() => alert("Pass and nickname will be sent to your email")}
        >
          Forgot the password or nickname?
        </button>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
