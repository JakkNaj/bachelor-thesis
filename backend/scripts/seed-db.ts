import { PrismaClient, ActivityType, ETransportType } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase(): Promise<void> {
  try {
    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    // Create first trip
    const parisTrip = await prisma.trip.create({
      data: {
        title: 'Paris Weekend',
        description: 'Weekend getaway to Paris',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-03'),
        userId: user.id,
      },
    });

    // Add activities to Paris trip
    await prisma.activity.create({
      data: {
        title: 'Flight to Paris',
        type: ActivityType.FLIGHT,
        startTime: new Date('2024-06-01T10:00:00'),
        endTime: new Date('2024-06-01T12:00:00'),
        tripId: parisTrip.id,
        flight: {
          create: {
            flightNumber: 'AF1234',
            airline: 'Air France',
            departureAirport: 'PRG',
            arrivalAirport: 'CDG',
            departureTime: new Date('2024-06-01T10:00:00'),
            arrivalTime: new Date('2024-06-01T12:00:00'),
            terminal: '2B',
            gate: 'G12',
          },
        },
      },
    });

    await prisma.activity.create({
      data: {
        title: 'Hotel Check-in',
        type: ActivityType.ACCOMMODATION,
        startTime: new Date('2024-06-01T14:00:00'),
        tripId: parisTrip.id,
        accommodation: {
          create: {
            address: '1 Rue de Rivoli, Paris',
            checkIn: new Date('2024-06-01T14:00:00'),
            checkOut: new Date('2024-06-03T11:00:00'),
            provider: 'Hotel de Ville',
            roomNumber: '404',
          },
        },
      },
    });

    // Create second trip
    const pragueTrip = await prisma.trip.create({
      data: {
        title: 'Prague Business Trip',
        description: 'Tech conference in Prague',
        startDate: new Date('2024-07-15'),
        endDate: new Date('2024-07-18'),
        userId: user.id,
      },
    });

    // Add activities to Prague trip
    await prisma.activity.create({
      data: {
        title: 'Transport to Conference',
        type: ActivityType.TRANSPORT,
        startTime: new Date('2024-07-15T09:00:00'),
        endTime: new Date('2024-07-15T09:30:00'),
        tripId: pragueTrip.id,
        transport: {
          create: {
            type: ETransportType.TAXI,
            fromLocation: 'Hotel',
            toLocation: 'Congress Center',
            provider: 'Bolt',
          },
        },
      },
    });

    await prisma.activity.create({
      data: {
        title: 'Dinner Reservation',
        type: ActivityType.FOOD,
        startTime: new Date('2024-07-15T19:00:00'),
        tripId: pragueTrip.id,
        food: {
          create: {
            restaurant: 'La Degustation',
            address: 'Haštalská 18, Prague',
            cuisine: 'Czech Modern',
            bookingRef: 'LD789',
          },
        },
      },
    });

    console.log('Database seeded successfully');
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seedDatabase();