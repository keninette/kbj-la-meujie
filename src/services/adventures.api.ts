import { Adventure } from '@/model/Adventure.class';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';

export const AdventuresApi = {
  getSessionNonPlayerCharacters: async (params: { adventureSlug: string; storyArcSlug: string }) => {
    const response = await fetch(`/api/adventures/${params.adventureSlug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      return [];
    }

    const adventure = Adventure.createFromJson(JSON.stringify(await response.json()));
    const storyArc = adventure.storyArcs.find(
      (thisStoryArc: StoryArc) => thisStoryArc.storyArcSlug === params.storyArcSlug,
    );

    const storyArcNpcs = [];
    for (const chapter of storyArc?.chapters ?? []) {
      for (const step of chapter.steps) {
        if (step.nonPlayerCharacters) {
          storyArcNpcs.push(step.nonPlayerCharacters);
        }
      }
    }

    return storyArcNpcs.flat().filter((npc, index, self) => {
      return index === self.findIndex((thisNpc) => thisNpc.id === npc.id);
    }) as NonPlayerCharacter[];
  },
  getAdventure: async (params: { adventureSlug: string }) => {
    const response = await fetch(`/api/adventures/${params.adventureSlug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      return [];
    }

    return await response.json();
  },
};
