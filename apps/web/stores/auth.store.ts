import { create } from "zustand";
import type { IUser } from "@rivique/shared";

interface AuthState {
  user:      IUser | null;
  token:     string | null;
  setUser:   (user: IUser, token: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user:      null,
  token:     null,
  setUser:   (user, token) => set({ user, token }),
  clearUser: ()            => set({ user: null, token: null }),
}));
