import type { IService } from "@rivique/shared";

interface BookingSummaryProps {
  service:     IService;
  scheduledAt: string;
  notes?:      string;
}

export function BookingSummary({ service, scheduledAt, notes }: BookingSummaryProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h3 className="mb-4 text-base font-semibold text-neutral-900">Booking Summary</h3>
      <div className="flex flex-col gap-3 text-sm">
        <Row label="Service"  value={service.name} />
        <Row label="Duration" value={`${service.duration} min`} />
        <Row label="Price"    value={`${service.currency} ${service.price.toFixed(2)}`} />
        <Row label="Date"     value={new Date(scheduledAt).toLocaleString()} />
        {notes && <Row label="Notes" value={notes} />}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium text-neutral-800">{value}</span>
    </div>
  );
}
