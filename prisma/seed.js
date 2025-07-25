const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('test123', 10);

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      // Add some test posts
      posts: {
        create: [
          {
            title: 'Welcome to My Blog',
            content: 'This is my first blog post! Welcome to my blog.',
            published: true,
            tags: 'welcome,first post',
          }
        ]
      }
    },
  });

  console.log('Seed data created:', { testUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 