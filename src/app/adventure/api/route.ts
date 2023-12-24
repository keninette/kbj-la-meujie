import { NextRequest } from 'next/server';
import { getAdventureById } from '@/lib/adventures/adventures.lib';
import path from 'path';
import * as fs from 'fs';

export async function GET(request: NextRequest) {
  const adventureSlug = request.nextUrl.searchParams.get('slug');
  let data = undefined;
  if (adventureSlug) {
    const filePath = path.join(process.cwd(), `/src/lib/json/${adventureSlug}.json`);
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return Response.json(data);
}

export async function POST(request: NextRequest) {
  const adventureSlug = request.nextUrl.searchParams.get('slug') || '';
  const adventure = getAdventureById(adventureSlug);

  if (adventure) {
    const filePath = path.join(process.cwd(), `/src/lib/json/${adventure.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(adventure), { flag: 'w+' });
  }

  return Response.json('ok');
}
