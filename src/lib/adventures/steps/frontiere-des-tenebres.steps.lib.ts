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
    sounds: [{
      name: 'Ambiance hôpital',
      filename: 'ambiance_hopital.mp3',
      loop: true,
      volume: 0.05
    }],
    nextStepsIds: ['2-2']
  },
  {
    id: '2-2',
    chapterId: 'FDT-2',
    level: 2,
    description: "Entrée dans la chambre d'hôpital",
    sounds: [{
      name: 'Ambiance chambre',
      filename: 'ambiance_hopital_chambre.mp3',
      loop: true,
      volume: 0.05
    }],
    clues: ["Boîte fermée (boîte d'archivage)"],
    diceRoll: {characteristic: [CharacteristicEnum.PSY], type: '1d100', onSuccess: {
      characteristic: [CharacteristicEnum.SAN], type: '1d100', onFail: '1 SAN', condition: 'Si relation amicale'
      }},
    nextStepsIds: ['2-3']
  },
  {
    id: '2-3',
    chapterId: 'FDT-2',
    level: 3,
    description: "Mort de Merriweather",
    sounds: [{
      name: 'ECG plat',
      filename: 'ecg_plat.mp3',
      loop: false,
      volume: 0.5,
      helper: "Au moment de la mort de Merriweather, en plus de l'ambiance"
    }],
    diceRoll: {characteristic: [CharacteristicEnum.SAN], onFail: '1 SAN', type: '1d100'},
    nextStepsIds: ['2-4']
  },
  {
    id: '2-4',
    chapterId: 'FDT-2',
    level: 4,
    description: "Ouverture de la boite",
    lights: [{intensity: 3, ...LightEnum.DAY}],
    clues: ['Acte de propriété + clé', 'Lettre de Merriweather', 'Boîte en forme de sarcophage', 'Journal'],
    sounds: [{
      name: 'Ambiance café',
      filename: 'ambiance_cafe.mp3',
      loop: true,
      volume: 0.05,
      helper: "Si dans un café/cafétéria de l'hôpital"
    }],
    nextStepsIds: ['2-5', '2-6', '2-7', '2-8']
  },
  {
    id: '2-5',
    chapterId: 'FDT-2',
    level: 5,
    description: "L'acte de propriété et la clé",
  },
  {
    id: '2-6',
    chapterId: 'FDT-2',
    level: 5,
    description: "La lettre",
  },
  {
    id: '2-7',
    chapterId: 'FDT-2',
    level: 5,
    description: "Boîte en or en forme de sarcophage",
    diceRoll: {
      type: '1d100',
      characteristic: [CharacteristicEnum.ARCHEO, CharacteristicEnum.HIST],
      onSuccess: { type: '1d100', characteristic: [ CharacteristicEnum.OCC]}
    }
  },
  {
    id: '2-8',
    chapterId: 'FDT-2',
    level: 5,
    description: "Le journal de Merriweather",
    diceRoll: {
      type: '1d100',
      characteristic: [CharacteristicEnum.SAN],
      onFail: '1d2 SAN'
    }
  },
  {
    id: '3-1',
    chapterId: 'FDT-3',
    level: 2,
    description: "Enquête sur la mort de Marion Allen",
    clues: [
      'Rapport de police',
      'Rapport du médecin légiste'
    ],
  },
  {
    id: '3-2',
    chapterId: 'FDT-3',
    level: 2,
    description: "Aller à la bibliothèque Orne de l'université Miskatonic",
    diceRoll: {
      type: '1d100',
      characteristic: [CharacteristicEnum.LIBRARY],
      condition: 'Tous les joueurs présents'
    },
    sounds: [{
      name: 'Tic tac',
      filename: 'tic_tac.mp3',
      volume: 0.1,
      loop: true
    }],
    clues: [
      'Volume de référence mentionné dans le journal (virtuel)',
      'Livre sur la civilisation mythique de Mu',
      'Extrait de catalogue mentionnant une copie De Vermiis Mysteriis dans la collection privée (virtuel)'
    ],
    nextStepsIds: ['3-3', '3-4']
  },
  {
    id: '3-3',
    chapterId: 'FDT-3',
    level: 3,
    description: "Etude des hieroglyphes de la boite en or",
    diceRoll: {
      condition: "Si OK, perte de 2/1d4 jours",
      type: '1d100', characteristic: [CharacteristicEnum.ARCHEO, CharacteristicEnum.LANG_EGYPT],
      onFail: {type: '1d100', characteristic: [CharacteristicEnum.BS, CharacteristicEnum.CHARM], condition: "Si demande d'aide à Warren Rice"}
    },
    clues: ['+/- Traduction des hiéroglyphes extérieurs'],
    nextStepsIds: ['3-5']
  },
  {
    id: '3-4',
    chapterId: 'FDT-3',
    level: 3,
    description: "Rencontre avec le Dr Henry Armitage",
    nextStepsIds: ['3-5']
  },
  {
    id: '3-5',
    chapterId: 'FDT-3',
    level: 4,
    description: "Se préparer à aller à la ferme",
  },
];

const getChapterSteps = (chapterId: string) => {
  return fdtSteps.filter((step) => step.chapterId === chapterId);
}

export {getChapterSteps};