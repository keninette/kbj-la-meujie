import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { constants } from 'node:http2';
import { Session } from '@/model/session/session.class';

const playersFilePath: string = path.join(process.cwd(), '/src/lib/players/players.json');

/**
 * Get data from JSON
 * @param request
 * @constructor
 */
async function GET(request: NextRequest) {
  if (!fs.existsSync(playersFilePath)) {
    return Response.json([]);
  }
  const players = fs.readFileSync(playersFilePath, 'utf-8');

  return Response.json(JSON.parse(players));
}

/**
 * Write data to json
 * @param request
 * @constructor
 */
async function POST(request: NextRequest) {
  const players: Session = await request.json();
  fs.writeFileSync(playersFilePath, JSON.stringify(players), { flag: 'w+' });

  return Response.json(players, { status: constants.HTTP_STATUS_CREATED });
}

export { GET, POST };
