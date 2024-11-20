import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { constants } from 'node:http2';
import { SessionMapper } from '@/model/sessions/session.mapper';
import { Session } from '@/model/sessions/Session.class';

const sessionsDirPath: string = path.join(process.cwd(), '/src/lib/data/sessions');

/**
 * Get data from JSON
 * @param request
 * @param params
 * @constructor
 */
async function GET(request: NextRequest, { params }: { params: { adventureSlug: string; sessionSlug: string } }) {
  const mapper = new SessionMapper();
  const content = fs.readFileSync(`${sessionsDirPath}/${params.adventureSlug}/${params.sessionSlug}.json`, 'utf-8');

  return Response.json(mapper.mapFromJson(content));
}

/**
 * Write data to json
 * @param request
 * @param params
 * @constructor
 */
async function PATCH(
  request: NextRequest,
  { params }: { params: { adventureSlug: string; storyArcSlug: string; sessionSlug: string } },
) {
  const session: Session = await request.json();
  const dirPath = `${sessionsDirPath}/${params.adventureSlug}/${params.storyArcSlug}`;
  const filePath = `${dirPath}/${params.sessionSlug}.json`;
  fs.mkdirSync(`${dirPath}`, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(session), { flag: 'w+' });

  return Response.json(session, { status: constants.HTTP_STATUS_CREATED });
}

export { GET, PATCH };
