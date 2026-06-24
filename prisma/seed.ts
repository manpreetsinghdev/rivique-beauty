import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding demo data (India)...");

  // Users
  const alice = await prisma.user.create({
    data: {
      email: "alice@example.in",
      firstName: "Alice",
      lastName: "Sharma",
      passwordHash: "$2a$12$dummyhash",
      phone: "+91-9876543210",
      role: "CLIENT",
    },
  });

  const vendorOwner = await prisma.user.create({
    data: {
      email: "studio@maisoncolette.in",
      firstName: "Maison",
      lastName: "Colette",
      passwordHash: "$2a$12$dummyhash",
      phone: "+91-9123456780",
      role: "VENDOR",
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@rivique.in",
      firstName: "Rivique",
      lastName: "Admin",
      passwordHash: "$2a$12$dummyhash",
      role: "ADMIN",
    },
  });

  // Vendor
  const maison = await prisma.vendor.create({
    data: {
      name: "Maison Colette",
      slug: "maison-colette-mumbai",
      description: "Luxury bridal salon in Mumbai",
      ownerId: vendorOwner.id,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      ratingAvg: 4.92,
      ratingCount: 124,
    },
  });

  // Services (prices in paise => ₹4200 = 420000 paise)
  const bridalMakeup = await prisma.service.create({
    data: {
      vendorId: maison.id,
      title: "Bridal Makeup",
      description: "Full-day bridal makeup with on-site touchups",
      durationMin: 180,
      pricePaise: 420000,
    },
  });

  const hairStyling = await prisma.service.create({
    data: {
      vendorId: maison.id,
      title: "Hair Styling",
      description: "Custom bridal hair styling and trial session",
      durationMin: 120,
      pricePaise: 250000,
    },
  });

  // Availability slots
  const now = new Date();
  const slot1Start = new Date(now.getTime() + 7 * 24 * 3600 * 1000); // 1 week
  const slot1End = new Date(slot1Start.getTime() + 1000 * 60 * 60 * 4);
  await prisma.availabilitySlot.create({
    data: {
      vendorId: maison.id,
      start: slot1Start,
      end: slot1End,
    },
  });

  const slot2Start = new Date(now.getTime() + 8 * 24 * 3600 * 1000);
  const slot2End = new Date(slot2Start.getTime() + 1000 * 60 * 60 * 4);
  await prisma.availabilitySlot.create({
    data: {
      vendorId: maison.id,
      start: slot2Start,
      end: slot2End,
    },
  });

  // Booking
  const bookingStart = new Date(now.getTime() + 7 * 24 * 3600 * 1000 + 2 * 60 * 60 * 1000);
  const bookingEnd = new Date(bookingStart.getTime() + bridalMakeup.durationMin * 60 * 1000);

  const booking = await prisma.booking.create({
    data: {
      userId: alice.id,
      vendorId: maison.id,
      serviceId: bridalMakeup.id,
      start: bookingStart,
      end: bookingEnd,
      status: "CONFIRMED",
      totalPaise: bridalMakeup.pricePaise,
    },
  });

  // Payment
  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amountPaise: bridalMakeup.pricePaise,
      provider: "razorpay",
      providerPaymentId: `rp_${Math.random().toString(36).slice(2, 9)}`,
      status: "PAID",
      capturedAt: new Date(),
    },
  });

  // Review
  await prisma.review.create({
    data: {
      authorId: alice.id,
      vendorId: maison.id,
      serviceId: bridalMakeup.id,
      bookingId: booking.id,
      rating: 5,
      title: "Perfect bridal look",
      body: "Maison Colette made my wedding day magical — flawless makeup and gentle touch.",
    },
  });

  // AI recommendation log
  await prisma.aIRecommendationLog.create({
    data: {
      userId: alice.id,
      vendorId: maison.id,
      serviceId: bridalMakeup.id,
      input: { preferences: ["soft-matte", "golden-hour"], budgetRupees: 50000 },
      result: { recommendedPackage: "Classic Radiance", score: 0.93 },
      score: 0.93,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
