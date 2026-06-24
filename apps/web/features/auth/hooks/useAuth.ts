"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { LoginFormValues, RegisterFormValues } from "../types";
import { apiClient } from "@/lib/api-client";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  async function login(values: LoginFormValues) {
    const result = await signIn("credentials", { ...values, redirect: false });
    if (result?.ok) router.push("/dashboard");
    return result;
  }

  async function register(values: RegisterFormValues) {
    await apiClient.post("/auth/register", values);
    return login({ email: values.email, password: values.password });
  }

  async function logout() {
    await signOut({ redirect: false });
    router.push("/");
  }

  return {
    session,
    isLoading:       status === "loading",
    isAuthenticated: status === "authenticated",
    login,
    register,
    logout,
  };
}
