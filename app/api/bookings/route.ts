import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      serviceId,
      notes,
    } = body;

    // Validate service selection
    if (!serviceId) {
      return NextResponse.json(
        { message: "Please select a service" },
        { status: 400 }
      );
    }

    // Find selected service
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    // Find existing user
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Create user if not exists
    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
        },
      });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        vendorId: service.vendorId,
        serviceId: service.id,
        start: new Date(),
        end: new Date(
          Date.now() + service.durationMin * 60000
        ),
        totalPaise: service.pricePaise,
        notes,
        status: "PENDING",
      },
      include: {
        user: true,
        service: true,
      },
    });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return NextResponse.json(
      { message: "Failed to submit booking" },
      { status: 500 }
    );
  }
}