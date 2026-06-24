import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();

    if (
      status !== "PENDING" &&
      status !== "CONFIRMED" &&
      status !== "CANCELLED" &&
      status !== "COMPLETED"
    ) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.update({
      where: {
        id: params.id,
      },
      data: {
        status,
      },
      include: {
        user: true,
        service: true,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("UPDATE BOOKING ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update booking" },
      { status: 500 }
    );
  }
}