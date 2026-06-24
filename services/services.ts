import { prisma } from "@/lib/prisma";

export async function getServices() {
  return await prisma.service.findMany({
    where: {
      active: true,
    },
    orderBy: {
      title: "asc",
    },
  });
}

export async function getFeaturedServices() {
  return await prisma.service.findMany({
    where: {
      active: true,
    },
    take: 4,
    orderBy: {
      title: "asc",
    },
  });
}

export async function getServiceBySlug(slug: string) {
  return await prisma.service.findFirst({
    where: {
      id: slug,
      active: true,
    },
  });
}