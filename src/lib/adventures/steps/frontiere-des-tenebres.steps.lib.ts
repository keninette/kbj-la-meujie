import {CharacteristicEnum} from "@/model/characteristic.enum";
import {StepType} from "@/model/step.type";
import {LightEnum} from "@/model/light.enum";

const fdtSteps: StepType[] = [
  {
    id: '2-1',
    chapterId: 'FDT-2',
    level: 1,
    description: "Avant d'entrer dans la chambre",
    lights: [{intensity: 3, ...LightEnum.COLD}],
    sounds: ['test2.mp3'],
    nextStepsIds: ['2-2']
  },
  {
    id: '2-2',
    chapterId: 'FDT-2',
    level: 2,
    description: "Entrée dans la chambre d'hôpital",
    clues: ['Boîte fermée'],
    stuff: ["Boîte d'archive/Boîte à souvenirs"],
    nextStepsIds: ['2-3']
  },
  {
    id: '2-3',
    chapterId: 'FDT-2',
    level: 3,
    description: "Mort de Merriweather",
    sounds: ['test1.mp3'],
    diceRoll: {characteristic: CharacteristicEnum.MENTAL_HEALTH, value: '0/1'},
    nextStepsIds: ['2-4']
  },
  {
    id: '2-4',
    chapterId: 'FDT-2',
    level: 4,
    description: "Ouverture de la boite",
    clues: ['Acte de propriété + clé', 'Lettre de Merriwearther', 'Boîte en forme de sarcophage', 'Journal']
  },
];

const getChapterSteps = (chapterId: string) => {
  return fdtSteps.filter((step) => step.chapterId === chapterId);
}

export {getChapterSteps};