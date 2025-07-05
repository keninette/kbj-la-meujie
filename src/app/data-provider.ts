import { Adventure } from '@/model/Adventure.class';

const saveAdventure = async (adventure?: Partial<Adventure>, isNewAdventure: boolean = false) => {
  return await fetch(`/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adventure),
  });
};

export { saveAdventure };
