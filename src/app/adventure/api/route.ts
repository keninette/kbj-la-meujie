import { NextRequest } from 'next/server';
import { getAdventureById } from '@/lib/adventures/adventures.lib';

export async function GET(request: NextRequest) {
  const adventureSlug = request.nextUrl.searchParams.get('slug') || '';
  const adventure = getAdventureById(adventureSlug);
  return Response.json({ adventure });
}
