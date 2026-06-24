"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "../schemas";
import { useAuth } from "../hooks/useAuth";

export function RegisterForm() {
  const { register: authRegister } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  return (
    <form onSubmit={handleSubmit(authRegister)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input {...register("firstName")} placeholder="First name" className="w-full rounded border px-3 py-2" />
          {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <input {...register("lastName")} placeholder="Last name" className="w-full rounded border px-3 py-2" />
          {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <input {...register("email")} type="email" placeholder="Email" className="w-full rounded border px-3 py-2" />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <input {...register("password")} type="password" placeholder="Password" className="w-full rounded border px-3 py-2" />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-black py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Creating account…" : "Create Account"}
      </button>
    </form>
  );
}
