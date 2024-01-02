import { Adventure } from '@/model/Adventure.class';

const saveAdventure = async (adventure?: Adventure, isNewAdventure: boolean = false) => {
  return await fetch(`/adventure/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adventure),
  });
};

export { saveAdventure };
