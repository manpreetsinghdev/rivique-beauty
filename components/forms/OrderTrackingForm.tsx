"use client";

import { useState } from "react";

interface BookingStatus {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export function OrderTrackingForm() {
  const [searchType, setSearchType] = useState<"id" | "email">("id");
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<BookingStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/bookings/search?type=${searchType}&value=${encodeURIComponent(searchValue)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking not found");
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search booking");
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-50 text-yellow-800 border border-yellow-200",
      confirmed: "bg-blue-50 text-blue-800 border border-blue-200",
      completed: "bg-green-50 text-green-800 border border-green-200",
      cancelled: "bg-red-50 text-red-800 border border-red-200",
    };
    return colors[status] || colors.pending;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pending Confirmation",
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6 card-glass p-6 md:p-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-4 md:flex-row flex-col">
          <div className="flex-1">
            <label className="label-luxury block mb-1.5">Search By</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as "id" | "email")}
              className="input-luxury w-full"
              disabled={isSearching}
            >
              <option value="id">Order ID</option>
              <option value="email">Email Address</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="label-luxury block mb-1.5">Enter {searchType === "id" ? "Order ID" : "Email"}</label>
            <input
              type={searchType === "email" ? "email" : "text"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchType === "email" ? "your@email.com" : "Order ID"}
              className="input-luxury w-full"
              required
              disabled={isSearching}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="btn-luxury w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? "Searching..." : "Search Booking"}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">✗ {error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-4 border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-ink-400 font-medium mb-1">Order ID</p>
              <p className="text-lg text-ink font-semibold font-mono">{result.id}</p>
            </div>
            <div>
              <p className="text-sm text-ink-400 font-medium mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(result.status)}`}>
                {getStatusLabel(result.status)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-ink-400 font-medium mb-1">Name</p>
              <p className="text-ink">{result.firstName} {result.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-ink-400 font-medium mb-1">Email</p>
              <p className="text-ink">{result.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-ink-400 font-medium mb-1">Consultation Date</p>
              <p className="text-ink">{new Date(result.preferredDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
            <div>
              <p className="text-sm text-ink-400 font-medium mb-1">Consultation Time</p>
              <p className="text-ink">{result.preferredTime}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Your booking was submitted on <strong>{new Date(result.createdAt).toLocaleDateString("en-IN")}</strong>.
              {result.status === "pending" && " We will contact you within 24 hours to confirm."}
              {result.status === "confirmed" && " Your consultation is confirmed. We look forward to seeing you!"}
              {result.status === "completed" && " Thank you for choosing Rivique Beauty!"}
              {result.status === "cancelled" && " This booking has been cancelled. Please contact us for assistance."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
