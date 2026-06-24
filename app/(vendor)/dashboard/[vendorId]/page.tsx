"use client";

import { useEffect, useState } from "react";
import { fetchVendorBookings } from "@/lib/api-client";

export default function BookingsPage({
  params,
}: {
  params: { vendorId: string };
}) {
  const vendorId = params.vendorId;

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    loadBookings();
  }, [vendorId]);

  const loadBookings = async () => {
    const data = await fetchVendorBookings(
      vendorId
    );

    setBookings(data || []);
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await fetch(
        `/api/vendor/bookings/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      loadBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl text-ink">
          Bookings
        </h2>

        <p className="text-ink-400 mt-2">
          Manage all customer appointments
          and requests.
        </p>
      </div>

      <div className="card-glass p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">
            Recent Bookings
          </h3>

          <span className="px-3 py-1 rounded-full bg-rose-gold-100 text-rose-gold-500 text-sm font-medium">
            {bookings.length} Total
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No bookings found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">
                    Customer
                  </th>

                  <th className="text-left py-3">
                    Email
                  </th>

                  <th className="text-left py-3">
                    Service
                  </th>

                  <th className="text-left py-3">
                    Date
                  </th>

                  <th className="text-left py-3">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium">
                      {b.user?.firstName}{" "}
                      {b.user?.lastName}
                    </td>

                    <td className="py-4 text-gray-600">
                      {b.user?.email}
                    </td>

                    <td className="py-4">
                      {b.service?.title}
                    </td>

                    <td className="py-4">
                      {new Date(
                        b.start
                      ).toLocaleDateString()}
                    </td>

                    <td className="py-4">
                      <div className="flex gap-2 items-center">

                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                          {b.status}
                        </span>

                        <button
                          onClick={() =>
                            updateStatus(
                              b.id,
                              "CONFIRMED"
                            )
                          }
                          className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              b.id,
                              "CANCELLED"
                            )
                          }
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Reject
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}