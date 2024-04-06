import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { constants } from 'node:http2';
import { Session } from '@/model/session/session.class';
import { SessionMapper } from '@/model/session/session.mapper';
import { Adventure } from '@/model/Adventure.class';

const sessionsDirPath: string = path.join(process.cwd(), '/src/lib/sessions');

/**
 * Get data from JSON
 * @param request
 * @constructor
 */
async function GET(request: NextRequest) {
  const mapper = new SessionMapper();
  const sessionFiles: string[] = fs.readdirSync(sessionsDirPath, { encoding: 'utf-8', recursive: true });

  const sessions = sessionFiles
    .map((sessionFile) => {
      if (fs.lstatSync(sessionsDirPath + '/' + sessionFile).isFile()) {
        const content = fs.readFileSync(`${sessionsDirPath}/${sessionFile}`, 'utf-8');
        return mapper.mapFromJson(content);
      }
    })
    .filter((session) => session !== undefined);

  return Response.json(sessions);
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
