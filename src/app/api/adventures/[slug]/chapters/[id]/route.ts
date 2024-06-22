import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { Adventure } from '@/model/AdventureManager.class';
import { CHAPTER_NOT_FOUND } from '@/model/errors';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';

const adventuresDirPath: string = path.join(process.cwd(), '/src/lib/data/adventures');

const fetchAdventureChapter = (adventure: Adventure, chapterId: string): Chapter | undefined => {
  const eligibleStoryArcs = adventure.storyArcs.filter((storyArc) =>
    storyArc.chapters.find((thisChapter: Chapter) => thisChapter.id === chapterId),
  );
  if (!eligibleStoryArcs.length || eligibleStoryArcs.length > 1) {
    console.error(CHAPTER_NOT_FOUND.replace('{id}', chapterId));
    return undefined;
  }

  const chapters = eligibleStoryArcs[0].chapters?.filter((thisChapter: Chapter) => thisChapter.id === chapterId);
  if (!chapters || !chapters.length) {
    console.error(CHAPTER_NOT_FOUND.replace('{id}', chapterId));
  } else {
    return chapters[0];
  }
};

/**
 * Get data from JSON
 * @param request
 * @param params
 * @constructor
 */
async function GET(request: NextRequest, { params }: { params: { slug: string; id: string } }) {
  const adventure = Adventure.createFromJson(fs.readFileSync(`${adventuresDirPath}/${params.slug}.json`, 'utf-8'));
  return Response.json(fetchAdventureChapter(adventure, params.id) || {});
}

export { GET };
