import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const vendorId = req.nextUrl.searchParams.get("vendorId");

    if (!vendorId) {
      return NextResponse.json(
        { message: "vendorId required" },
        { status: 400 }
      );
    }

    const slots = await prisma.availabilitySlot.findMany({
      where: {
        vendorId,
      },
      orderBy: {
        start: "asc",
      },
    });

    return NextResponse.json(slots);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const vendorId = req.nextUrl.searchParams.get("vendorId");

    if (!vendorId) {
      return NextResponse.json(
        { message: "vendorId required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const slot = await prisma.availabilitySlot.create({
      data: {
        vendorId,
        start: new Date(body.start),
        end: new Date(body.end),
      },
    });

    return NextResponse.json(slot);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create slot" },
      { status: 500 }
    );
  }
}