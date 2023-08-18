import {getServerSession} from 'next-auth/next';
import {nextAuthOptions} from '@/app/api/auth/[...nextauth]/options';

import {Link} from '@prisma/client';

import crypto from 'crypto';

import {PrismaService} from '@/app/services/prisma.service';

const prisma = PrismaService.client;

export async function POST(request: Request): Promise<Response> {
    const parameters = await request.json();

    const original = parameters.original;
    const alias = parameters.alias || crypto.randomBytes(4).toString('hex');

    const session = await getServerSession(nextAuthOptions);

    let result: Link;
    if (!session?.user?.email) {
        result = await prisma.link.create({data: {original, alias}});
    } else {
        result = await prisma.link.create({data: {original, alias, user: {connect: {email: session.user.email}}}});
    }

    return new Response(JSON.stringify(result));
}
