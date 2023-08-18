import {NextResponse} from 'next/server';

import {getServerSession} from 'next-auth/next';
import {nextAuthOptions} from '@/app/api/auth/[...nextauth]/options';

import {Link} from '.prisma/client';

import {PrismaService} from '@/app/services/prisma.service';

const prisma = PrismaService.client;

export async function GET(): Promise<NextResponse<Link[]>> {
    const session = await getServerSession(nextAuthOptions);

    if (!session?.user?.email) {
        return NextResponse.json([]);
    }

    const links = await prisma.link.findMany({where: {user: {email: session.user.email}}});
    return NextResponse.json(links);
}
