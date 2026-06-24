import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const vendorId = req.nextUrl.searchParams.get("vendorId");

    if (!vendorId) {
      return NextResponse.json(
        { message: "vendorId is required" },
        { status: 400 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        vendorId,
      },
    });

    const totalBookings = bookings.length;

    const confirmedBookings = bookings.filter(
      (b) => b.status === "CONFIRMED"
    ).length;

    const cancelledBookings = bookings.filter(
      (b) => b.status === "CANCELLED"
    ).length;

    const revenue = confirmedBookings * 5000;

    return NextResponse.json({
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      revenue,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}