import {NextResponse} from 'next/server';

import {getServerSession} from 'next-auth/next';
import {nextAuthOptions} from '@/app/api/auth/[...nextauth]/options';

import {Link} from '@prisma/client';

import crypto from 'crypto';

import {PrismaService} from '@/app/services/prisma.service';

const prisma = PrismaService.client;

export async function GET(): Promise<NextResponse<Link[]>> {
    const session = await getServerSession(nextAuthOptions);

    if (!session?.user?.email) {
        return NextResponse.json([]);
    }

    const links = await prisma.link.findMany({
        where: {user: {email: session.user.email}},
        orderBy: {updatedAt: 'desc'},
    });

    return NextResponse.json(links);
}

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

export async function DELETE(request: Request): Promise<Response> {
    const {id} = await request.json();

    if (!id) {
        return new Response(JSON.stringify({error: 'ID is required'}), {status: 400});
    }

    const session = await getServerSession(nextAuthOptions);

    if (!session?.user?.email) {
        return new Response(JSON.stringify({error: 'not logged in'}), {status: 400});
    }

    const result = await prisma.link.deleteMany({
        where: {
            AND: [
                {
                    id,
                },
                {
                    user: {email: session.user.email},
                },
            ],
        },
    });

    return new Response(JSON.stringify(result));
}
