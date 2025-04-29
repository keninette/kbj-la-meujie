import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { constants } from 'node:http2';
import { SessionMapper } from '@/model/sessions/session.mapper';
import { Session } from '@/model/sessions/Session.class';
import { Adventure } from '@/model/Adventure.class';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';

const sessionsDirPath: string = path.join(process.cwd(), '/src/lib/data/sessions');

/**
 * Get data from JSON
 * @param request
 * @param params
 * @constructor
 */
async function GET(
  request: NextRequest,
  { params }: { params: { adventureSlug: string; storyArcSlug: string; sessionSlug: string } },
) {
  // todo remove when using db (slug params are in fact uuids, it's ugly af)
  const adventureUuidsToSlug = {
    ['cf28a30c-7f96-43b0-b4da-6f618e6017c3']: 'copie',
    ['cf28a30c-7f96-43b0-b4da-6f618e6017c2']: 'la-renaissance-de-cyaegha',
  };

  const adventuresDirPath: string = path.join(process.cwd(), '/src/lib/json/adventures');
  const adventure = Adventure.createFromJson(
    fs.readFileSync(
      `${adventuresDirPath}/${adventureUuidsToSlug[params.adventureSlug as keyof typeof adventureUuidsToSlug]}.json`,
      'utf-8',
    ),
  );

  const storyArcSlug = adventure?.storyArcs.find((storyArc: StoryArc) => storyArc.storyArcUuid === params.storyArcSlug)
    ?.storyArcSlug;

  const mapper = new SessionMapper();
  const content = fs.readFileSync(
    `${sessionsDirPath}/${
      adventureUuidsToSlug[params.adventureSlug as keyof typeof adventureUuidsToSlug]
    }/${storyArcSlug}/${params.sessionSlug}.json`,
    'utf-8',
  );

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
