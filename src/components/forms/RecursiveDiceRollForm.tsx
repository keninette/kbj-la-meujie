import {DiceRoll, DiceRollCallbackTypeEnum} from "@/model/DiceRoll.class";
import {FormEvent} from "react";
import {CharacteristicEnum} from "@/model/characteristic.enum";

type RecursiveDiceRollProps {
  diceRoll: DiceRoll;
  onChange: (e: FormEvent) => void;
}

export default function RecursiveDiceRollForm({diceRoll, onChange}: RecursiveDiceRollProps) {
  const typeInput = (value: string, onChangeFunction: (arg0: FormEvent) => void) => (
    <div className='flex flex-col w-full mt-3'>
      <label htmlFor='name' className='text-white'>
        Type
      </label>
      <input
        type='text'
        name='type'
        placeholder='Type'
        value={value}
        onChange={(e) => onChangeFunction(e)}
        className='flex text-black'
        required
      />
    </div>
  );

  const conditionInput = (value: string, onChangeFunction: (arg0: FormEvent) => void) => (
    <div className='flex flex-col w-full mt-3'>
      <label htmlFor='name' className='text-white'>
        Condition
      </label>
      <input
        type='text'
        name='condition'
        placeholder='Condition'
        value={value}
        onChange={(e) => onChangeFunction(e)}
        className='flex text-black'
      />
    </div>
  );

  const characteristicsInput = (value: CharacteristicEnum[], onChangeFunction: (arg0: FormEvent) => void) => (
    <div className='flex flex-col w-full mt-3'>
      <label htmlFor='name' className='text-white'>
        Caractéristiques
      </label>
      <select
        name='characteristic'
        placeholder='Caractéristiques'
        value={value}
        onChange={(e) => onChangeFunction(e)}
        className='flex text-black w-full'
        required
        multiple
      >
        <option>-</option>
        {Object.keys(CharacteristicEnum).map((characteristic) => (
          <option key={characteristic} value={characteristic}>
            {CharacteristicEnum[characteristic as keyof typeof CharacteristicEnum]}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      {typeInput(diceRoll.type, (e) => {
        onChange('type', e.target.value);
      })}
      {characteristicsInput(diceRoll.characteristic, (e) => onChange('characteristics', e.target.value))}
      {conditionInput(diceRoll.condition || '', (e) => onChange('condition', e.target.value))}
      <div className='flex flex-col w-full mt-3 ml-2'>
        <label htmlFor='name' className='text-white'>
          🟢 On success
        </label>
        <select
          name='onSuccessType'
          placeholder='On success'
          value={diceRoll.onSuccess.type}
          onChange={(e) => onChange('onSuccessType', e.target.value)}
          className='flex text-black w-full'
          required
        >
          <option value='string'>Entrer un texte</option>
          <option value='clue'>Donner un indice</option>
          <option value='diceRoll'>Ajouter un jet de dé</option>
        </select>
        {diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.TEXT && (
          <input
            type='text'
            name='onSuccess'
            placeholder='On success'
            value={diceRoll.onSuccess?.value || ''}
            onChange={(e) => onChange('onSuccessText', e.target.value)}
            className='flex text-black'
            required
          />
        )}
        {diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.CLUE && (
          <input
            type='text'
            name='onSuccess'
            placeholder='On success'
            value={diceRoll.onSuccess?.value || ''}
            onChange={(e) => onChange('onSuccessClue', e.target.value)}
            className='flex text-black'
            required
          />
        )}
        {diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
          <RecursiveDiceRollForm diceRoll={diceRoll.onSuccess} onChange={onChange}/>
        )}
      </div><div className='flex flex-col w-full mt-3 ml-2'>
        <label htmlFor='name' className='text-white'>
          🔴 On fail
        </label>
        <select
          name='onFailType'
          placeholder='On fail'
          value={diceRoll.onFail.type}
          onChange={(e) => onChange('onFailType', e.target.value)}
          className='flex text-black w-full'
          required
        >
          <option value='string'>Entrer un texte</option>
          <option value='clue'>Donner un indice</option>
          <option value='diceRoll'>Ajouter un jet de dé</option>
        </select>
        {diceRoll.onFail.type === DiceRollCallbackTypeEnum.TEXT && (
          <input
            type='text'
            name='onFail'
            placeholder='On fail'
            value={diceRoll.onFail?.value || ''}
            onChange={(e) => onChange('onFailText', e.target.value)}
            className='flex text-black'
            required
          />
        )}
        {diceRoll.onFail.type === DiceRollCallbackTypeEnum.CLUE && (
          <input
            type='text'
            name='onFail'
            placeholder='On success'
            value={diceRoll.onFail?.value || ''}
            onChange={(e) => onChange('onFailClue', e.target.value)}
            className='flex text-black'
            required
          />
        )}
        {diceRoll.onFail.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
          <RecursiveDiceRollForm diceRoll={diceRoll.onFail} onChange={onChange}/>
        )}
      </div>
    </>
  );
}