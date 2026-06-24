import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const vendorId = req.nextUrl.searchParams.get("vendorId");

    console.log("VENDOR ID FROM URL:", vendorId);

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
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        service: true,
      },
    });

    //console.log("BOOKINGS FOUND:", bookings.length);
   // console.log("BOOKINGS DATA:", bookings);

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("BOOKINGS API ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}