import {AdventureType} from "@/model/adventure.type";
import {frontiereDesTenebres} from "./frontiere-des-tenebres.lib";

const allAdventures: AdventureType[] = [
    frontiereDesTenebres
];

const getAdventureById = (id: string) => {
    return allAdventures.find((adventure) => adventure.id === id);
};

export { allAdventures, getAdventureById};