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

    const services = await prisma.service.findMany({
      where: {
        vendorId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}