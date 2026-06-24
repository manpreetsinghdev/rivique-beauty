import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const service = await prisma.service.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update service" },
      { status: 500 }
    );
  }
}