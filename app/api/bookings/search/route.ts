import { NextResponse } from "next/server";

// Mock storage (in production, use a database)
const bookingsStore: Record<string, any> = {};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") as "id" | "email";
    const value = url.searchParams.get("value");

    if (!type || !value) {
      return NextResponse.json(
        { success: false, message: "Missing search parameters" },
        { status: 400 }
      );
    }

    if (type === "id") {
      const booking = bookingsStore[value];
      if (!booking) {
        return NextResponse.json(
          { success: false, message: "Booking not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: booking });
    }

    if (type === "email") {
      const booking = Object.values(bookingsStore).find(
        (b) => b.email.toLowerCase() === value.toLowerCase()
      );
      if (!booking) {
        return NextResponse.json(
          { success: false, message: "No bookings found for this email" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: booking });
    }

    return NextResponse.json(
      { success: false, message: "Invalid search type" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Search failed" },
      { status: 500 }
    );
  }
}
