import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { constants } from 'node:http2';
import { Session } from '@/model/session/session.class';
import { SessionMapper } from '@/model/session/mappers/session.mapper';

const sessionsDirPath: string = path.join(process.cwd(), '/src/lib/sessions');

/**
 * Get data from JSON
 * @param request
 * @param params
 * @constructor
 */
async function GET(request: NextRequest, { params }: { params: { adventureSlug: string; uuid: string } }) {
  const mapper = new SessionMapper();
  const content = fs.readFileSync(`${sessionsDirPath}/${params.adventureSlug}/${params.uuid}.json`, 'utf-8');

  return Response.json(mapper.mapFromJson(content));
}

/**
 * Write data to json
 * @param request
 * @constructor
 */
async function POST(request: NextRequest) {
  const session: Session = await request.json();
  const dirPath = `${sessionsDirPath}/${session.adventure.adventureSlug}`;
  const filePath = `${dirPath}/${session.uuid}.json`;
  fs.mkdirSync(`${sessionsDirPath}/${session.adventure.adventureSlug}`, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(session), { flag: 'w+' });

  return Response.json(session, { status: constants.HTTP_STATUS_CREATED });
}

export { GET, POST };
