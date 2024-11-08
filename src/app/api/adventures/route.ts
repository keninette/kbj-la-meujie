import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { Adventure } from '@/model/AdventureManager.class';
import { AdventureMapper } from '@/model/adventure/adventure.mapper';

const adventuresDirPath: string = path.join(process.cwd(), '/src/lib/data/adventures');

const fetchAllAdventureCards = () => {
  const mapper = new AdventureMapper();
  const adventureFiles: string[] = fs.readdirSync(adventuresDirPath, { encoding: 'utf-8' });
  return adventureFiles.map((adventureFile) => {
    const content = fs.readFileSync(`${adventuresDirPath}/${adventureFile}`, 'utf-8');
    // todo this should be in mapper
    const adventure = Adventure.createFromJson(content);
    return mapper.mapToAdventureCarDto(adventure);
  });
};

/**
 * Get data from JSON
 * @param request
 * @constructor
 */
async function GET(request: NextRequest) {
  // Or fetch all adventures basic info
  return Response.json(fetchAllAdventureCards());
}

export { GET };
