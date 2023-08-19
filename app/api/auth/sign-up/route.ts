import bcrypt from 'bcrypt';

import {PrismaService} from '@/app/services/prisma.service';

const prisma = PrismaService.client;

export async function POST(request: Request): Promise<Response> {
    const {name, email, password} = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({data: {name, email, password: hashedPassword}});

    return new Response(JSON.stringify(result));
}
