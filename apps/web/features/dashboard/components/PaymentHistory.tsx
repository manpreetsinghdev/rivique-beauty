"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { API_ROUTES } from "@rivique/shared";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/feedback/EmptyState";
import type { IPayment, PaginatedDto } from "@rivique/shared";
import { PaymentStatus } from "@rivique/shared";

const STATUS_VARIANT: Record<PaymentStatus, "success" | "error" | "warning" | "default" | "info"> = {
  [PaymentStatus.PAID]:     "success",
  [PaymentStatus.FAILED]:   "error",
  [PaymentStatus.REFUNDED]: "info",
  [PaymentStatus.UNPAID]:   "warning",
};

export function PaymentHistory() {
  const { data, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn:  () =>
      apiClient.get<PaginatedDto<IPayment>>("/payments/me").then((r) => r.data),
  });

  if (isLoading) return <div className="flex justify-center py-12"><Spinner /></div>;
  if (!data?.data.length) return <EmptyState title="No payments yet" />;

  return (
    <ul className="flex flex-col gap-3">
      {data.data.map((payment) => (
        <li key={payment.id} className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-5">
          <div>
            <p className="font-medium text-neutral-900">{payment.provider}</p>
            <p className="mt-0.5 text-sm text-neutral-500">
              {new Date(payment.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-neutral-800">
              {payment.currency} {Number(payment.amount).toFixed(2)}
            </span>
            <Badge label={payment.status} variant={STATUS_VARIANT[payment.status]} />
          </div>
        </li>
      ))}
    </ul>
  );
}
