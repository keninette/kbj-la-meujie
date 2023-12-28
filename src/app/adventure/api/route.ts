import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { Adventure } from '@/model/Adventure.class';

export async function GET(request: NextRequest) {
  const adventuresDirPath: string = path.join(process.cwd(), '/src/lib/json/adventures');
  const adventureSlug = request.nextUrl.searchParams.get('slug');
  const chapterId = request.nextUrl.searchParams.get('chapterId');

  // Fetching a single adventure or one of its chapter
  if (adventureSlug) {
    const adventure = new Adventure(fs.readFileSync(`${adventuresDirPath}/${adventureSlug}.json`, 'utf-8'));

    if (chapterId) {
      const chapters = adventure.chapters?.filter((thisChapter) => thisChapter.id === chapterId);
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
  const adventureSlug = request.nextUrl.searchParams.get('slug') || '';
  /*const adventure = getAdventureById(adventureSlug);

  if (adventure) {
    const filePath = path.join(process.cwd(), `/src/lib/json/adventures/${adventure.id}.json`);
    const adventureAsClass = new Adventure(JSON.stringify(adventure));
    adventureAsClass.slug = adventure.id;
    adventureAsClass.equipment = adventure.stuff?.map((thisStuff) => {
      return { name: thisStuff, isReady: false };
    });
    adventureAsClass.todos = adventure.preparation?.map((prep) => {
      return { name: prep, isReady: false };
    });
    fs.writeFileSync(filePath, JSON.stringify(adventureAsClass), { flag: 'w+' });
  }*/

  // todo return 201
  return Response.json('ok');
}
