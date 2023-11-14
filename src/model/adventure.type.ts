import {UniverseEnum} from "./universe.enum";
import {ChapterType} from "./chapter.type";

export type AdventureType = {
    id: string;
    name: string;
    universe: UniverseEnum;
    chapters: ChapterType[];
    stuff: string[];
    players: {min: number, max: number};
}