import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [{ name: 'user' }, { name: 'admin' }];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name
      }
    });
  }
  // eslint-disable-next-line no-console
  console.log('Role seeding finished.');
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Erro during seeding: ', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
