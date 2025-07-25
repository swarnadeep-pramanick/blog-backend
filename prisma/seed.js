const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password,
      posts: {
        create: [
          {
            title: 'First Post',
            content: 'This is the first post.',
            published: true,
            comments: {
              create: [
                { content: 'Great post!' },
                { content: 'Thanks for sharing.' }
              ]
            }
          },
          {
            title: 'Second Post',
            content: 'This is the second post.',
            published: true
          }
        ]
      }
    }
  });
  console.log('Seeded user:', user.email);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 