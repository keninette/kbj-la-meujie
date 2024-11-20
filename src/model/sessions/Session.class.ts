import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { PlayerCharacter } from '@/model/sessions/PlayerCharacter.class';
import { v4 } from 'uuid';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { Adventure } from '@/model/Adventure.class';
import { SessionInterface } from '@/model/sessions/Session.interface';
import { RawDraftContentState } from 'react-draft-wysiwyg';

export class Session implements SessionInterface {
  uuid: string;
  slug: string;
  name: string;
  adventureSlug: string;
  storyArcSlug: string;
  playerCharacters: PlayerCharacter[];
  nonPlayerCharacters: NonPlayerCharacter[];
  description?: RawDraftContentState;

  constructor(adventureSlug: string, storyArcSlug: string) {
    this.uuid = v4();
    this.slug = '';
    this.name = '';
    this.adventureSlug = adventureSlug;
    this.storyArcSlug = storyArcSlug;
    this.playerCharacters = [];
    this.nonPlayerCharacters = [];
  }
}
