import { DiceRoll } from '@/model/DiceRoll.class';
import { FormEvent, useEffect, useState } from 'react';
import RecursiveDiceRollFormItem from '@/components/forms/RecursiveDiceRollFormItem';

export type RecursiveDiceRollProps = {
  onSubmitCallback: (diceRoll: DiceRoll) => void;
  requestedDiceRoll?: DiceRoll;
};

export default function RecursiveDiceRollForm({ onSubmitCallback, requestedDiceRoll }: RecursiveDiceRollProps) {
  const [diceRoll, setDiceRoll] = useState<DiceRoll>(new DiceRoll('', []));
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(diceRoll);
  };

  useEffect(() => {
    if (requestedDiceRoll) {
      setDiceRoll(requestedDiceRoll);
    }
  }, [requestedDiceRoll]);

  return (
    <>
      <h3 className='my-4'>Ajouter un jet de dé</h3>
      <div className='flex w-full mt-8'>
        <form className='flex flex-col w-full ml-4' onSubmit={onSubmit}>
          <RecursiveDiceRollFormItem iterations={0} diceRoll={diceRoll} setDiceRoll={setDiceRoll} />
          <button type='submit'>Enregistrer</button>
        </form>
      </div>
    </>
  );
}
