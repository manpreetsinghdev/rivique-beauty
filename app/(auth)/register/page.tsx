"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api-client";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await register({ firstName, lastName, email, password });
      router.push("/");
    } catch (err: any) {
      setError(err?.message ?? "Registration failed");
    }
  }

  return (
    <div className="max-w-md mx-auto py-20 px-6">
      <h1 className="font-serif text-2xl">Create account</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="label-luxury">First name</label>
        <input className="input-luxury" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

        <label className="label-luxury">Last name</label>
        <input className="input-luxury" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label className="label-luxury">Email</label>
        <input className="input-luxury" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="label-luxury">Password</label>
        <input type="password" className="input-luxury" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button className="btn-luxury" type="submit">Create account</button>
      </form>
    </div>
  );
}
