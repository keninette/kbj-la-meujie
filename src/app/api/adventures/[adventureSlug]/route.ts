import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { Adventure } from '@/model/Adventure.class';

const adventuresDirPath: string = path.join(process.cwd(), '/src/lib/json/adventures');

const fetchAdventureBySlug = (slug: string): Adventure => {
  return Adventure.createFromJson(fs.readFileSync(`${adventuresDirPath}/${slug}.json`, 'utf-8'));
};

/**
 * Get data from JSON
 * @param request
 * @param params
 * @constructor
 */
async function GET(request: NextRequest, { params }: { params: { adventureSlug: string } }) {
  const adventure = fetchAdventureBySlug(params.adventureSlug);
  return Response.json(adventure);
}

export { GET };
