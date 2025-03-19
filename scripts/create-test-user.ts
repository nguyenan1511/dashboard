import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    const user = await prisma.user.upsert({
        where: {
            email: 'test@example.com',
        },
        update: {
            password: hashedPassword,
        },
        create: {
            email: 'test@example.com',
            name: 'Test User',
            password: hashedPassword,
        },
    });

    console.log('Created test user:', user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 