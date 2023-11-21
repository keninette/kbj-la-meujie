import { CharacteristicEnum } from '@/model/characteristic.enum';
import { StepType } from '@/model/step.type';
import { LightEnum } from '@/model/light.enum';
import { DiceRollCallbackTypeEnum } from '@/model/dice-roll.type';

const fdtSteps: StepType[] = [
  {
    id: '2-1',
    chapterId: 'FDT-2',
    level: 1,
    description: "Avant d'entrer dans la chambre",
    lights: [{ intensity: 3, color: LightEnum.WHITE, helper: 'Lumière blanche, hôpital' }],
    audios: [
      {
        name: 'Ambiance hôpital',
        filename: 'ambiance_hopital.mp3',
        loop: true,
        autoplay: true,
        volume: 0.05,
      },
    ],
    nextStepsIds: ['2-2'],
  },
  {
    id: '2-2',
    chapterId: 'FDT-2',
    level: 2,
    description: "Entrée dans la chambre d'hôpital",
    audios: [
      {
        name: 'Ambiance chambre',
        filename: 'ambiance_hopital_chambre.mp3',
        loop: true,

        volume: 0.05,
      },
    ],
    clues: ["Boîte fermée (boîte d'archivage)"],
    diceRolls: [
      {
        characteristic: [CharacteristicEnum.PSY],
        type: '1d100',
        onSuccess: {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: {
            characteristic: [CharacteristicEnum.SAN],
            type: '1d100',
            condition: 'Si relation amicale 0/1 SAN',
          },
        },
      },
    ],
    nextStepsIds: ['2-3'],
  },
  {
    id: '2-3',
    chapterId: 'FDT-2',
    level: 3,
    description: 'Mort de Merriweather',
    audios: [
      {
        name: 'ECG plat',
        filename: 'ecg_plat.mp3',

        volume: 0.5,
        helper: "Au moment de la mort de Merriweather, en plus de l'ambiance",
      },
    ],
    diceRolls: [
      {
        characteristic: [CharacteristicEnum.SAN],
        onFail: { type: DiceRollCallbackTypeEnum.TEXT, value: '1 SAN' },
        type: '1d100',
      },
    ],
    nextStepsIds: ['2-4'],
  },
  {
    id: '2-4',
    chapterId: 'FDT-2',
    level: 4,
    description: 'Ouverture de la boite',
    lights: [{ intensity: 5, color: LightEnum.YELLOW, helper: 'Lumière naturelle, jour' }],
    clues: ['Acte de propriété + clé', 'Lettre de Merriweather', 'Boîte en forme de sarcophage', 'Journal'],
    audios: [
      {
        name: 'Ambiance café',
        filename: 'ambiance_cafe.mp3',
        loop: true,

        volume: 0.05,
        helper: "Si dans un café/cafétéria de l'hôpital",
      },
    ],
    nextStepsIds: ['2-5', '2-6', '2-7', '2-8'],
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
    description: 'La lettre',
  },
  {
    id: '2-7',
    chapterId: 'FDT-2',
    level: 5,
    description: 'Boîte en or en forme de sarcophage',
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.ARCHEO, CharacteristicEnum.HIST],
        onSuccess: {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: { type: '1d100', characteristic: [CharacteristicEnum.OCC] },
        },
      },
    ],
  },
  {
    id: '2-8',
    chapterId: 'FDT-2',
    level: 5,
    description: 'Le journal de Merriweather',
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.SAN],
        onFail: { type: DiceRollCallbackTypeEnum.TEXT, value: '1d2 SAN pour le lecteur' },
      },
    ],
  },
  {
    id: '3-1',
    chapterId: 'FDT-3',
    level: 2,
    description: 'Enquête sur la mort de Marion Allen',
    clues: ['Rapport de police', 'Rapport du médecin légiste'],
  },
  {
    id: '3-2',
    chapterId: 'FDT-3',
    level: 2,
    description: "Aller à la bibliothèque Orne de l'université Miskatonic",
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.LIBRARY],
        condition: 'Tous les joueurs présents',
      },
    ],
    audios: [
      {
        name: 'Tic tac',
        filename: 'tic_tac.mp3',

        volume: 0.1,
        loop: true,
      },
    ],
    clues: [
      'Volume de référence mentionné dans le journal (virtuel) si jet de bibliothèque OK',
      'Livre sur la civilisation mythique de Mu si 2 jets de bibliothèque OK',
      'Extrait de catalogue mentionnant une copie De Vermiis Mysteriis dans la collectioiiiju                                                                                                      n privée (virtuel)',
    ],
    nextStepsIds: ['3-3', '3-4'],
  },
  {
    id: '3-3',
    chapterId: 'FDT-3',
    level: 3,
    description: 'Etude des hieroglyphes de la boite en or',
    diceRolls: [
      {
        condition: 'Si OK, perte de 2/1d4 jours',
        type: '1d100',
        characteristic: [CharacteristicEnum.ARCHEO, CharacteristicEnum.LANG_EGYPT],
        onFail: {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: {
            type: '1d100',
            characteristic: [CharacteristicEnum.BS, CharacteristicEnum.CHARM],
            condition: "Si demande d'aide à Warren Rice",
          },
        },
      },
    ],
    clues: ['+/- Traduction des hiéroglyphes extérieurs'],
    nextStepsIds: ['3-5'],
  },
  {
    id: '3-4',
    chapterId: 'FDT-3',
    level: 3,
    description: 'Rencontre avec le Dr Henry Armitage',
    nextStepsIds: ['3-5'],
  },
  {
    id: '3-5',
    chapterId: 'FDT-3',
    level: 4,
    description: 'Se préparer à aller à la ferme',
  },
  {
    id: '4-1',
    chapterId: 'FDT-4',
    level: 1,
    description: "Ross's corner",
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.PSY],
        onSuccess: {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: { type: '1d100', characteristic: [CharacteristicEnum.CHARM, CharacteristicEnum.BS] },
        },
      },
    ],
    audios: [
      {
        name: 'Ambiance campagne 18h',
        filename: 'campagne_18h.mp3',
        loop: true,
        autoplay: true,
        volume: 0.15,
      },
    ],
    nextStepsIds: ['4-2', '4-3'],
  },
  {
    id: '4-2',
    chapterId: 'FDT-4',
    level: 2,
    description: 'Les habitants',
    clues: ['Carte pour se rendre à la ferme', 'La ferme est hantée'],
  },
  {
    id: '4-3',
    chapterId: 'FDT-4',
    level: 2,
    description: 'Epicerie',
    clues: ['Les habitants la pensent hantée', "Ma' Peters méprise cette théorie & connaît de nom Merriweather"],
    diceRolls: [
      {
        condition: 'Si mauvais jet auparavent',
        type: '1d100',
        characteristic: [CharacteristicEnum.CHARM],
        onSuccess: { type: DiceRollCallbackTypeEnum.CLUE, value: "Ma' leur parle de Maggie McPhirter" },
      },
    ],
  },
  {
    id: '5-1',
    chapterId: 'FDT-5',
    level: 1,
    description: 'La ferme',
    audios: [
      {
        name: 'Ambiance maison abandonnée',
        filename: 'courant_air.mp3',
        autoplay: true,
        loop: true,
      },
    ],
    nextStepsIds: ['5-2', '5-3', '5-4'],
  },
  {
    id: '5-2',
    chapterId: 'FDT-5',
    level: 2,
    description: 'Faire le tour de la maison',
    nextStepsIds: ['5-5'],
  },
  {
    id: '5-3',
    chapterId: 'FDT-5',
    level: 2,
    description: 'Inspecter la forêt',
    diceRolls: [
      {
        type: '1/1d4 1d100',
        characteristic: [CharacteristicEnum.SAN],
        onSuccess: {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: {
            type: '1d100',
            characteristic: [CharacteristicEnum.URGENT_CARE, CharacteristicEnum.MED],
          },
        },
      },
    ],
    clues: ["Cadavre d'une femme d'une cinquantaine d'année (Maggie McPhirter)"],
  },
  {
    id: '5-4',
    chapterId: 'FDT-5',
    level: 2,
    description: 'Fouiller la grange',
    diceRolls: [
      {
        type: '1/1d4 1d100',
        characteristic: [CharacteristicEnum.DEX],
        onFail: { type: DiceRollCallbackTypeEnum.TEXT, value: '- 1d4 PV' },
      },
    ],
    clues: ['Quelques outils rouillés', "Aucun animal plus gros qu'un rat", 'Vieux bois à sécher'],
  },
  {
    id: '5-5',
    chapterId: 'FDT-5',
    level: 3,
    description: 'Inspecter le vieux jardin',
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.FHO],
        onSuccess: { type: DiceRollCallbackTypeEnum.TEXT, value: 'Présence de légumes bien mûrs' },
      },
    ],
    nextStepsIds: ['5-6'],
  },
  {
    id: '5-6',
    chapterId: 'FDT-5',
    level: 4,
    description: 'Inspecter la friche',
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.FHO],
        onSuccess: {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: {
            type: '1d100',
            characteristic: [CharacteristicEnum.BIO, CharacteristicEnum.MED, CharacteristicEnum.NAT],
          },
        },
      },
    ],
    nextStepsIds: ['5-7'],
  },
  {
    id: '5-7',
    chapterId: 'FDT-5',
    level: 5,
    description: 'Toilettes & puits',
  },
  {
    id: '6-1',
    chapterId: 'FDT-6',
    level: 1,
    description: 'La ferme',
    clues: ['Description de la ferme  : Approcher de la ferme'],
    audios: [
      {
        name: 'Ambiance maison abandonnée',
        filename: 'courant_air.mp3',
        loop: true,
        autoplay: true,
      },
      {
        name: 'Balançoire qui grince',
        filename: 'grincement_metal.mp3',
      },
      {
        name: 'Porte qui grince',
        filename: 'porte_qui_grince.mp3',
      },
    ],
    lights: [
      {
        color: LightEnum.ORANGE,
        intensity: 5,
        helper: "Lumière naturelle, fin d'après-midi",
      },
    ],
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.OCC],
        onSuccess: { type: DiceRollCallbackTypeEnum.TEXT, value: 'Sceaux pour refouler les esprits malfaisants' },
      },
    ],
    nextStepsIds: ['6-2', '6-3'],
  },
  {
    id: '6-2',
    chapterId: 'FDT-6',
    level: 2,
    description: 'La pièce principale',
    lights: [
      {
        color: LightEnum.ORANGE,
        intensity: 4,
        helper: 'Pièce un peu obscure',
      },
    ],
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.LISTEN],
        onSuccess: { type: DiceRollCallbackTypeEnum.TEXT, value: 'Son : des bruits de pas dans un escalier' },
      },
    ],
    audios: [
      {
        name: 'Pas dans un escalier',
        filename: 'escalier_course.mp3',
      },
    ],
    clues: ['Lampe à huile, mais vide et sans mèche'],
  },
  {
    id: '6-3',
    chapterId: 'FDT-6',
    level: 2,
    description: 'La pièce de derrière',
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.LISTEN],
        onSuccess: { type: DiceRollCallbackTypeEnum.TEXT, value: 'Son : des bruits de pas dans un escalier' },
      },
    ],
    audios: [
      {
        name: 'Pas en dessous',
        filename: 'pas_parquet_03.mp3',
      },
    ],
    clues: ['Description "La pièce de derrière"', 'Même symboles occultes sur une trappe au plafond'],
    nextStepsIds: ['6-4', '6-5', '6-6'],
  },
  {
    id: '6-4',
    chapterId: 'FDT-6',
    level: 3,
    description: 'La pièce de derrière',
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.FHO],
        onSuccess: { type: DiceRollCallbackTypeEnum.CLUE, value: 'Indices sur Red Jake' },
      },
    ],
    clues: [
      'Traces de pas boueux venant de la porte',
      "Reste d'un feu pas plus vieux que la veille dans la cheminée",
      'Restes de camp',
    ],
  },
  {
    id: '6-5',
    chapterId: 'FDT-6',
    level: 3,
    description: 'Ouvrir la trappe du grenier (TAI 90)',
    diceRolls: [
      {
        type: '1d100, difficulté 2',
        characteristic: [CharacteristicEnum.ESCAPE],
        onSuccess: {
          type: DiceRollCallbackTypeEnum.TEXT,
          value: '- 1d4-1 PV, min 1 / -1/1d2 SAN',
        },
        onFail: {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: {
            type: '1d100',
            characteristic: [CharacteristicEnum.SAN],
            onFail: { type: DiceRollCallbackTypeEnum.TEXT, value: '-1d12 PV | -1/1d4 SAN' },
          },
        },
      },
    ],
    audios: [
      {
        name: 'Bruit du monstre essouflé après attaque',
        filename: 'monstre_11.mp3',
      },
    ],
  },
  {
    id: '6-6',
    chapterId: 'FDT-6',
    level: 3,
    description: "Red Jake s'enfuit",
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.DEX],
        condition: 'Red Jake aussi, si 2 OK il arrive à fuir',
        onSuccess: { type: DiceRollCallbackTypeEnum.TEXT, value: 'Interroger Red Jake' },
        onFail: {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: {
            type: '1d100',
            characteristic: [CharacteristicEnum.DEX],
            condition: 'Red Jake aussi, si 2 OK il arrive à fuir',
            onSuccess: { type: DiceRollCallbackTypeEnum.TEXT, value: 'Interroger Red Jake' },
            onFail: { type: DiceRollCallbackTypeEnum.TEXT, value: 'Il fuit' },
          },
        },
      },
    ],
    nextStepsIds: ['6-7'],
  },
  {
    id: '6-7',
    chapterId: 'FDT-6',
    level: 4,
    description: 'Interroger Red Jake',
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.PSY],
        onSuccess: {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: {
            type: '1d100',
            characteristic: [CharacteristicEnum.PSY_ANA],
            onSuccess: {
              type: DiceRollCallbackTypeEnum.CLUE,
              value: 'Histoire de Red Jake',
            },
          },
        },
      },
    ],
  },
  {
    id: '7-1',
    chapterId: 'FDT-7',
    level: 1,
    description: 'Inspection',
    clues: ['De quoi allumer la lampe à huile'],
    audios: [
      {
        name: 'Ambiance maison abandonnée',
        filename: 'courant_air.mp3',
        loop: true,
        autoplay: true,
      },
    ],
    lights: [{ intensity: 3, color: LightEnum.YELLOW, helper: 'Lampe à huile' }],
    nextStepsIds: ['7-2'],
  },
  {
    id: '7-2',
    chapterId: 'FDT-7',
    level: 2,
    description: "Si Red Jake ne s'est pas enfuit",
    diceRolls: [
      {
        type: '1d100',
        characteristic: [CharacteristicEnum.MELEE],
        onSuccess: { type: DiceRollCallbackTypeEnum.TEXT, value: 'Degats Red Jake page 39 + escape (DEX si contest)' },
      },
    ],
    nextStepsIds: ['7-3'],
  },
  {
    id: '7-3',
    chapterId: 'FDT-7',
    level: 3,
    description: 'Inspection de la cave',
    clues: [
      'Du bois',
      "Des mèches et de l'huile",
      'Des boîtes périmées',
      'De vieilles couvertures',
      "De l'alcool de bonne qualité",
      'Un objet indistinct sous une bâche',
    ],
    nextStepsIds: ['7-4'],
  },
  {
    id: '7-4',
    chapterId: 'FDT-7',
    level: 4,
    description: "La malle (même sceaux à l'intérieur de la boîte)",
    clues: [
      'Une lettre si ils veulent la lire',
      '6 toges noires bien pliées',
      'Une boite de cigares',
      'Une liasse de papiers jaunis',
    ],
    nextStepsIds: ['7-5'],
  },
  {
    id: '7-5',
    chapterId: 'FDT-7',
    level: 5,
    description: 'La boite à cigares',
    clues: [
      'Un récipient avec de la poudre grossière brune',
      'Une boite en bois avec une substance argentée qui ressemble à du talcdi',
    ],
  },
];

const getChapterSteps = (chapterId: string) => {
  return fdtSteps.filter((step) => step.chapterId === chapterId);
};

export { getChapterSteps };
