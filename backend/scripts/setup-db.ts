import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import bcrypt from 'bcrypt';

async function setupDatabase(): Promise<void> {
  try {
    // Generate Prisma Client
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Run Prisma migrations
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    
    const prisma = new PrismaClient();

    const hashedPassword = await bcrypt.hash('password', 10);
    
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword,
      },
    });

    console.log('Database setup completed successfully');
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();