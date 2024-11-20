import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { Adventure } from '@/model/Adventure.class';
import { constants } from 'node:http2';
import { AdventureMapper } from '@/model/adventure/adventure.mapper';
import { CHAPTER_NOT_FOUND } from '@/model/errors';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';

const adventuresDirPath: string = path.join(process.cwd(), '/src/lib/json/adventures');

const fetchAllAdventureCards = () => {
  const mapper = new AdventureMapper();
  const adventureFiles: string[] = fs.readdirSync(adventuresDirPath, { encoding: 'utf-8' });
  return adventureFiles.map((adventureFile) => {
    const content = fs.readFileSync(`${adventuresDirPath}/${adventureFile}`, 'utf-8');
    const adventure = Adventure.createFromJson(content);
    return mapper.mapToAdventureCarDto(adventure);
  });
};

const fetchAdventureBySlug = (slug: string): Adventure => {
  return Adventure.createFromJson(fs.readFileSync(`${adventuresDirPath}/${slug}.json`, 'utf-8'));
};

const fetchAdventureChapter = (adventure: Adventure, chapterId: string): Chapter | undefined => {
  const eligibleStoryArcs = adventure.storyArcs.filter((storyArc) =>
    storyArc.chapters.find((thisChapter) => thisChapter.id === chapterId),
  );
  if (!eligibleStoryArcs.length || eligibleStoryArcs.length > 1) {
    console.error(CHAPTER_NOT_FOUND.replace('{id}', chapterId));
    return undefined;
  }

  const chapters = eligibleStoryArcs[0].chapters?.filter((thisChapter) => thisChapter.id === chapterId);
  if (!chapters || !chapters.length) {
    console.error(CHAPTER_NOT_FOUND.replace('{id}', chapterId));
  } else {
    return chapters[0];
  }
};

/**
 * Get data from JSON
 * @param request
 * @constructor
 */
async function GET(request: NextRequest) {
  const adventureSlug = request.nextUrl.searchParams.get('adventureSlug');
  const chapterId = request.nextUrl.searchParams.get('chapterId');

  // Either Fetch a single adventure or one of its chapter
  if (adventureSlug) {
    const adventure = fetchAdventureBySlug(adventureSlug);

    if (chapterId) {
      return Response.json(fetchAdventureChapter(adventure, chapterId));
    }

    return Response.json(adventure);
  }

  // Or fetch all adventures basic info
  return Response.json(fetchAllAdventureCards());
}

/**
 * Write data to json
 * @param request
 * @constructor
 */
async function POST(request: NextRequest) {
  const adventure: Adventure = await request.json();
  const filePath = path.join(process.cwd(), `/src/lib/json/adventures/${adventure.adventureSlug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(adventure), { flag: 'w+' });

  return Response.json(adventure, { status: constants.HTTP_STATUS_CREATED });
}

export { GET, POST };
