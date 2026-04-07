import { PrismaClient, MatchStatus } from '@prisma/client';
import { ApiError } from '../utils/ApiError';

const prisma = new PrismaClient();

export const getUserMatches = async (userId: string) => {
  return await prisma.match.findMany({
    where: { userId },
    include: {
      event: {
        select: { id: true, title: true, startDate: true, city: true }
      }
    },
    orderBy: { score: 'desc' }
  });
};

export const updateMatchStatus = async (matchId: string, userId: string, status: MatchStatus) => {
  const match = await prisma.match.findUnique({
    where: { id: matchId }
  });

  if (!match) throw new ApiError(404, 'Match not found');
  if (match.userId !== userId) throw new ApiError(403, 'Not authorized to update this match');

  return await prisma.match.update({
    where: { id: matchId },
    data: { status }
  });
};
