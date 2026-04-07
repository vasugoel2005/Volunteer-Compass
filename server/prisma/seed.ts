import { PrismaClient, Role, EventStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create Categories
  const categoryEnvironment = await prisma.category.upsert({
    where: { name: 'Environment' },
    update: {},
    create: { name: 'Environment' },
  });

  await prisma.category.upsert({
    where: { name: 'Education' },
    update: {},
    create: { name: 'Education' },
  });

  await prisma.category.upsert({
    where: { name: 'Health' },
    update: {},
    create: { name: 'Health' },
  });

  console.log('Categories seeded.');

  // 2. Create Skills
  await prisma.skill.upsert({
    where: { name: 'Teaching' },
    update: {},
    create: { name: 'Teaching', category: 'Education' },
  });

  const skillGardening = await prisma.skill.upsert({
    where: { name: 'Gardening' },
    update: {},
    create: { name: 'Gardening', category: 'Environment' },
  });

  const skillFirstAid = await prisma.skill.upsert({
    where: { name: 'First Aid' },
    update: {},
    create: { name: 'First Aid', category: 'Health' },
  });

  console.log('Skills seeded.');

  // 3. Create Users
  await prisma.user.upsert({
    where: { email: 'admin@volunteercompass.local' },
    update: {},
    create: {
      email: 'admin@volunteercompass.local',
      name: 'Admin User',
      role: Role.ADMIN,
      isVerified: true,
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
    },
  });

  const organizerUser = await prisma.user.upsert({
    where: { email: 'organizer@volunteercompass.local' },
    update: {},
    create: {
      email: 'organizer@volunteercompass.local',
      name: 'Green Earth Foundation',
      role: Role.ORGANIZER,
      isVerified: true,
      bio: 'A local non-profit dedicated to environmental sustainability.',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
    },
  });

  await prisma.user.upsert({
    where: { email: 'volunteer@volunteercompass.local' },
    update: {},
    create: {
      email: 'volunteer@volunteercompass.local',
      name: 'Jane Doe',
      role: Role.VOLUNTEER,
      isVerified: true,
      bio: 'Passionate about helping the community and the planet.',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      latitude: 37.7749,
      longitude: -122.4194,
      skills: {
        create: [
          { skill: { connect: { id: skillGardening.id } } },
          { skill: { connect: { id: skillFirstAid.id } } }
        ]
      }
    },
  });

  console.log('Users seeded.');

  // 4. Create Events
  // Note: For events, we check if one exists for this organizer to prevent endless duplication on re-run
  const existingEvents = await prisma.event.findMany({
    where: { organizerId: organizerUser.id }
  });

  if (existingEvents.length === 0) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    await prisma.event.create({
      data: {
        title: 'Community Garden Spring Cleanup',
        description: 'Join us to prepare the local community garden for the upcoming spring season. We will be weeding, planting new seeds, and setting up the irrigation system.',
        status: EventStatus.PUBLISHED,
        organizer: { connect: { id: organizerUser.id } },
        address: '123 Golden Gate Park',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        latitude: 37.7694,
        longitude: -122.4862,
        startDate: nextWeek,
        endDate: new Date(nextWeek.getTime() + 4 * 60 * 60 * 1000), // 4 hours later
        minVolunteers: 5,
        maxVolunteers: 20,
        skills: {
          create: [
            { skill: { connect: { id: skillGardening.id } } }
          ]
        },
        categories: {
          create: [
            { category: { connect: { id: categoryEnvironment.id } } }
          ]
        }
      }
    });

    console.log('Events seeded.');
  } else {
    console.log('Events already exist, skipping event creation.');
  }

  console.log('Database seeding completed successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
