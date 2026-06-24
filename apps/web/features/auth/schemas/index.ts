import { z } from "zod";

export const loginSchema = z.object({
  email:    z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().min(1, "Last name is required"),
  email:     z.string().email("Invalid email"),
  password:  z.string().min(8, "At least 8 characters"),
  phone:     z.string().optional(),
});

export type LoginSchema    = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
