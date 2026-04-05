import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ guildId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });


  try {
    const { guildId } = await params;
    let guild = await prisma.guild.findUnique({ where: { id: guildId } });
    
    // Automatically create a database entry for the Guild if they open the dashboard
    if (!guild) {
      guild = await prisma.guild.create({
        data: { id: guildId, prefix: '!' }
      });
    }

    return NextResponse.json(guild);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Database access failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ guildId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });


  try {
    const { guildId } = await params;
    const body = await req.json();
    const { prefix, logChannel, welcomeChannel } = body;

    const guild = await prisma.guild.upsert({
      where: { id: guildId },
      update: { 
        prefix: prefix || undefined,
        logChannel: logChannel || null,
        welcomeChannel: welcomeChannel || null
      },
      create: { 
        id: guildId, 
        prefix: prefix || '!', 
        logChannel: logChannel || null,
        welcomeChannel: welcomeChannel || null 
      }
    });

    return NextResponse.json(guild);
  } catch (error) {
    console.error('Failed to update guild settings:', error);
    return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
  }
}
