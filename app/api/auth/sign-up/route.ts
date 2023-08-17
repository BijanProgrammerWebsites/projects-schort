import {NextRequest, NextResponse} from 'next/server';

import bcrypt from 'bcrypt';

import {PrismaService} from '@/app/services/prisma.service';

const prisma = PrismaService.client;

export async function POST(request: NextRequest): Promise<NextResponse> {
    const {name, email, password} = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({data: {name, email, password: hashedPassword}});

    return NextResponse.json(result);
}
