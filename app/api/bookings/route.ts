import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { BookingFormData } from "@/types/booking";

export async function POST(request: Request) {
  try {
    const body: BookingFormData = await request.json();

    const required: (keyof BookingFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "serviceId",
      "weddingDate",
      "preferredDate",
      "preferredTime",
    ];

    const missing = required.filter((key) => !body[key]);

    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing fields: ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
        },
      });
    }

    const vendor = await prisma.vendor.findFirst();

    if (!vendor) {
      return NextResponse.json(
        {
          success: false,
          message: "No Vendor found",
        },
        { status: 400 }
      );
    }

    const service = await prisma.service.findFirst();

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: "No Service found",
        },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        vendorId: vendor.id,
        serviceId: service.id,
        start: new Date(body.preferredDate),
        end: new Date(body.preferredDate),
        totalPaise: service.pricePaise,
        notes: body.notes || "",
      },
    });

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Booking creation failed",
      },
      { status: 500 }
    );
  }
}