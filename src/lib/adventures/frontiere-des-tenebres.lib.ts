import { AdventureType } from '@/model/adventure.type';
import { UniverseEnum } from '@/model/universe.enum';
import { getChapterSteps } from './steps/frontiere-des-tenebres.steps.lib';

const frontiereDesTenebres: AdventureType = {
  id: 'a-la-frontiere-des-tenebres',
  name: 'A la frontière des ténèbres',
  universe: UniverseEnum.CHTULHU,
  players: { min: 2, max: 5 },
  chapters: [
    { id: 'FDT-1', adventureId: 'a-la-frontiere-des-tenebres', name: 'Introduction', nextChapterId: 'FDT-2' },
    {
      id: 'FDT-2',
      adventureId: 'a-la-frontiere-des-tenebres',
      name: "Visite à l'hôpital",
      steps: getChapterSteps('FDT-2'),
      nextChapterId: 'FDT-3',
    },
    {
      id: 'FDT-3',
      adventureId: 'a-la-frontiere-des-tenebres',
      name: 'Recherches',
      steps: getChapterSteps('FDT-3'),
      nextChapterId: 'FDT-4',
    },
    {
      id: 'FDT-4',
      adventureId: 'a-la-frontiere-des-tenebres',
      name: "Ross's corner",
      steps: getChapterSteps('FDT-4'),
      nextChapterId: 'FDT-5',
    },
    {
      id: 'FDT-5',
      adventureId: 'a-la-frontiere-des-tenebres',
      name: 'La ferme - inspection des alentours',
      steps: getChapterSteps('FDT-5'),
      nextChapterId: 'FDT-6',
    },
    {
      id: 'FDT-6',
      adventureId: 'a-la-frontiere-des-tenebres',
      name: 'La ferme - inspection de la maison',
      steps: getChapterSteps('FDT-6'),
      nextChapterId: 'FDT-7',
    },
    {
      id: 'FDT-7',
      adventureId: 'a-la-frontiere-des-tenebres',
      name: 'La cave',
      steps: getChapterSteps('FDT-7'),
    },
  ],
  stuff: [
    "Boîte d'archivage/Boîte à souvenirs",
    'Lettre de Merriweather + envelope',
    'Acte de propriété + clé dans envelope en craft',
  ],
  preparation: [
    'Mettre acte de propriété + clé dans une envelope',
    'Mettre lettre de Merriweather dans une envelope',
    'Mettre les 2 envelopes + le journal dans la boîte',
    'Remplir la section "Personnes importantes" pour Merriweather : rencontre & sentiments',
  ],
};

const getChapterById = (id: string) => {
  return frontiereDesTenebres.chapters.find((chapter) => chapter.id === id);
};

export { frontiereDesTenebres, getChapterById };
