import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { Adventure } from '@/model/Adventure.class';
import { constants } from 'node:http2';

export async function GET(request: NextRequest) {
  const adventuresDirPath: string = path.join(process.cwd(), '/src/lib/json/adventures');
  const adventureSlug = request.nextUrl.searchParams.get('slug');
  const chapterId = request.nextUrl.searchParams.get('chapterId');

  // Fetching a single adventure or one of its chapter
  if (adventureSlug) {
    const adventure = Adventure.createFromJson(fs.readFileSync(`${adventuresDirPath}/${adventureSlug}.json`, 'utf-8'));

    if (chapterId) {
      const eligibleStoryArcs = adventure.storyArcs.filter((storyArc) =>
        storyArc.chapters.find((thisChapter) => thisChapter.id === chapterId),
      );
      if (!eligibleStoryArcs.length || eligibleStoryArcs.length > 1) {
        console.error("Pas d'arc trouvé pour ce châpitre");
      }
      const chapters = eligibleStoryArcs[0].chapters?.filter((thisChapter) => thisChapter.id === chapterId);
      if (!chapters || !chapters.length) {
        console.error('whoopsie daisy');
      } else {
        return Response.json(chapters[0]);
      }
    }
    return Response.json(adventure);
  }

  // Fetching all adventures basic info
  const files: string[] = fs.readdirSync(adventuresDirPath, { encoding: 'utf-8' });
  const dtos: Object[] = [];
  files.forEach((file) => {
    const content = fs.readFileSync(`${adventuresDirPath}/${file}`, 'utf-8');
    dtos.push(Adventure.getAdventureCardDto(content));
  });
  return Response.json(dtos);
}

export async function POST(request: NextRequest) {
  const adventure: Adventure = await request.json();
  const filePath = path.join(process.cwd(), `/src/lib/json/adventures/${adventure.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(adventure), { flag: 'w+' });

  return Response.json(adventure, { status: constants.HTTP_STATUS_CREATED });
}
