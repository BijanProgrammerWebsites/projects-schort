import {getServerSession} from 'next-auth/next';
import {nextAuthOptions} from '@/app/api/auth/[...nextauth]/options';

import crypto from 'crypto';

import {PrismaService} from '@/app/services/prisma.service';

const prisma = PrismaService.client;

export async function POST(request: Request): Promise<Response> {
    const {original} = await request.json();
    const alias = crypto.randomBytes(4).toString('hex');

    const session = await getServerSession(nextAuthOptions);
    if (!session?.user?.email) {
        await prisma.link.create({data: {original, alias}});
    } else {
        await prisma.link.create({data: {original, alias, user: {connect: {email: session.user.email}}}});
    }

    return new Response();
}
