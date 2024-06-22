import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { Adventure } from '@/model/AdventureManager.class';
import { constants } from 'node:http2';

const adventuresDirPath: string = path.join(process.cwd(), '/src/lib/data/adventures');

/**
 * Get data from JSON
 * @param request
 * @param params
 * @constructor
 */
async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const adventure = Adventure.createFromJson(fs.readFileSync(`${adventuresDirPath}/${params.slug}.json`, 'utf-8'));
  return Response.json(adventure);
}

/**
 * Write data to json
 * @param request
 * @param params
 * @constructor
 */
async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  // todo there must be a better way to do this
  const adventure: Adventure = await request.json();
  const filePath = path.join(process.cwd(), `/src/lib/data/adventures/${params.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(adventure), { flag: 'w+' });

  return Response.json(adventure, { status: constants.HTTP_STATUS_CREATED });
}

export { GET, POST };
