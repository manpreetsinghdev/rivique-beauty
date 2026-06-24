"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth.store";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import type { IUser } from "@rivique/shared";

const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName:  z.string().min(1),
  phone:     z.string().optional(),
});
type ProfileSchema = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const user    = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const token   = useAuthStore((s) => s.token);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: user?.firstName, lastName: user?.lastName, phone: user?.phone },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProfileSchema) =>
      apiClient.patch<IUser>(`/users/${user?.id}/profile`, data).then((r) => r.data),
    onSuccess: (updated) => token && setUser(updated, token),
  });

  return (
    <form onSubmit={handleSubmit((d) => mutate(d))} className="flex flex-col gap-5 max-w-md">
      <Input label="First Name" error={errors.firstName?.message} {...register("firstName")} />
      <Input label="Last Name"  error={errors.lastName?.message}  {...register("lastName")} />
      <Input label="Phone"      error={errors.phone?.message}      {...register("phone")} type="tel" />
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 self-start rounded-md bg-neutral-900 px-5 py-2.5 text-sm text-white disabled:opacity-50"
      >
        {isPending && <Spinner size="sm" />}
        {isPending ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
