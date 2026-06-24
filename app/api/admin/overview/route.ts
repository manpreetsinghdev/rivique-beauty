import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();

    const totalVendors = await prisma.vendor.count();

    const totalBookings = await prisma.booking.count();

    const pendingBookings = await prisma.booking.count({
      where: {
        status: "PENDING",
      },
    });

    const recentBookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 12,
    });

    return NextResponse.json({
      totalUsers,
      totalVendors,
      totalBookings,
      pendingBookings,
      recentBookings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch overview" },
      { status: 500 }
    );
  }
}