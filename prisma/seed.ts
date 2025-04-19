import PasswordHash from '@/application/security/bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { id: 1, name: 'user' },
    { id: 2, name: 'admin' }
  ];

  const adminsUsers = [
    {
      name: 'Admin CaminhoDev',
      email: 'admin@caminhodev.com',
      password: 'admin',
      roleId: 2
    }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        id: role.id,
        name: role.name
      }
    });
  }

  for (const adminUser of adminsUsers) {
    await prisma.user.upsert({
      where: { email: adminUser.email },
      update: {},
      create: {
        name: adminUser.name,
        email: adminUser.email,
        password: await PasswordHash.hash(adminUser.password),
        roleId: adminUser.roleId
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
