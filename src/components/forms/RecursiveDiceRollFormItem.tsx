import React from 'react';
import { CharacteristicEnum } from '@/model/enums/characteristic.enum';
import { DiceRoll, DiceRollCallbackTypeEnum } from '@/model/DiceRoll.class';

type RecursiveDiceRollFormItemProps = {
  iterations: number;
  diceRoll: DiceRoll;
  setDiceRoll: (parent: DiceRoll) => void;
};

export default function RecursiveDiceRollFormItem({
  iterations = 0,
  diceRoll,
  setDiceRoll,
}: RecursiveDiceRollFormItemProps) {
  const nextIterationValue = iterations + 1;
  const onChange = (fieldName: string, value: string) => {
    const updatedDiceRoll: DiceRoll = { ...diceRoll };
    switch (fieldName) {
      case 'characteristics':
        updatedDiceRoll.characteristic.push(value as keyof typeof CharacteristicEnum);
        break;
      case 'onSuccessType':
        updatedDiceRoll.onSuccess.type = value as DiceRollCallbackTypeEnum;
        if ((value as DiceRollCallbackTypeEnum) === DiceRollCallbackTypeEnum.DICE_ROLL) {
          updatedDiceRoll.onSuccess.value = new DiceRoll('', []);
        } else {
          updatedDiceRoll.onSuccess.value = '';
        }
        break;
      case 'onSuccessValue':
        updatedDiceRoll.onSuccess.value = value;
        break;
      case 'onFailType':
        updatedDiceRoll.onFail.type = value as DiceRollCallbackTypeEnum;
        if ((value as DiceRollCallbackTypeEnum) === DiceRollCallbackTypeEnum.DICE_ROLL) {
          updatedDiceRoll.onFail.value = new DiceRoll('', []);
        } else {
          updatedDiceRoll.onFail.value = '';
        }
        break;
      case 'onFailValue':
        updatedDiceRoll.onFail.value = value;
        break;
      default:
        // @ts-ignore
        updatedDiceRoll[fieldName] = value;
        break;
    }
    setDiceRoll(updatedDiceRoll);
  };

  return (
    <div className={`flex flex-col w-full ml-${iterations * 2}`}>
      <div className='flex flex-col w-full mt-3'>
        <label htmlFor='name' className='text-white'>
          Condition
        </label>
        <input
          type='text'
          name='condition'
          placeholder='Condition'
          value={diceRoll.condition}
          onChange={(e) => onChange('condition', e.target.value)}
          className='flex text-black'
        />
      </div>
      <div className='flex flex-col w-full mt-3'>
        <label htmlFor='name' className='text-white'>
          Type
        </label>
        <input
          type='text'
          name='type'
          placeholder='Type'
          value={diceRoll.type}
          onChange={(e) => onChange('type', e.target.value)}
          className='flex text-black'
        />
      </div>
      <div className='flex flex-col w-full mt-3'>
        <label htmlFor='name' className='text-white'>
          Caractéristiques
        </label>
        <select
          name='characteristic'
          placeholder='Caractéristiques'
          value={diceRoll.characteristic}
          onChange={(e) => onChange('characteristics', e.target.value)}
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
      <div className='flex flex-col w-full mt-3'>
        <label htmlFor='name' className='text-white'>
          🟢 On success
        </label>
        <select
          name='onSuccessType'
          placeholder='On success'
          value={diceRoll.onSuccess.type}
          onChange={(e) => onChange('onSuccessType', e.target.value)}
          className='flex text-black w-full'
        >
          <option value={DiceRollCallbackTypeEnum.TEXT}>Entrer un texte</option>
          <option value={DiceRollCallbackTypeEnum.DICE_ROLL}>Ajouter un jet de dé</option>
          <option value={DiceRollCallbackTypeEnum.CLUE}>Donner un indice</option>
        </select>
      </div>
      {diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.TEXT && (
        <div className='flex flex-col w-full mt-3'>
          <label htmlFor='name' className='text-white'>
            Texte
          </label>
          <input
            type='text'
            name='type'
            placeholder='Type'
            value={diceRoll.onSuccess.value as string}
            onChange={(e) => onChange('onSuccessValue', e.target.value)}
            className='flex text-black'
          />
        </div>
      )}
      {diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.CLUE && (
        <div className='flex flex-col w-full mt-3'>
          <label htmlFor='name' className='text-white'>
            Indice
          </label>
          <input
            type='text'
            name='type'
            placeholder='Type'
            value={diceRoll.onSuccess.value as string}
            onChange={(e) => onChange('onSuccessValue', e.target.value)}
            className='flex text-black'
          />
        </div>
      )}
      {diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
        <RecursiveDiceRollFormItem
          iterations={nextIterationValue}
          diceRoll={diceRoll.onSuccess.value as DiceRoll}
          setDiceRoll={(newDiceRoll: DiceRoll) => {
            const updatedDiceRoll: DiceRoll = { ...diceRoll };
            (updatedDiceRoll.onSuccess.value as DiceRoll) = newDiceRoll;
            setDiceRoll(updatedDiceRoll);
          }}
        />
      )}
      <div className='flex flex-col w-full mt-3'>
        <label htmlFor='name' className='text-white'>
          🔴 On fail
        </label>
        <select
          name='onFailType'
          placeholder='On fail'
          value={diceRoll.onFail.type}
          onChange={(e) => onChange('onFailType', e.target.value)}
          className='flex text-black w-full'
        >
          <option value={DiceRollCallbackTypeEnum.TEXT}>Entrer un texte</option>
          <option value={DiceRollCallbackTypeEnum.DICE_ROLL}>Ajouter un jet de dé</option>
          <option value={DiceRollCallbackTypeEnum.CLUE}>Donner un indice</option>
        </select>
      </div>
      {diceRoll.onFail.type === DiceRollCallbackTypeEnum.TEXT && (
        <div className='flex flex-col w-full mt-3'>
          <label htmlFor='name' className='text-white'>
            Texte
          </label>
          <input
            type='text'
            name='type'
            placeholder='Type'
            value={diceRoll.onFail.value as string}
            onChange={(e) => onChange('onFailValue', e.target.value)}
            className='flex text-black'
          />
        </div>
      )}
      {diceRoll.onFail.type === DiceRollCallbackTypeEnum.CLUE && (
        <div className='flex flex-col w-full mt-3'>
          <label htmlFor='name' className='text-white'>
            Indice
          </label>
          <input
            type='text'
            name='type'
            placeholder='Type'
            value={diceRoll.onFail.value as string}
            onChange={(e) => onChange('onFailValue', e.target.value)}
            className='flex text-black'
          />
        </div>
      )}
      {diceRoll.onFail.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
        <RecursiveDiceRollFormItem
          iterations={nextIterationValue}
          diceRoll={diceRoll.onFail.value as DiceRoll}
          setDiceRoll={(newDiceRoll: DiceRoll) => {
            const updatedDiceRoll: DiceRoll = { ...diceRoll };
            (updatedDiceRoll.onFail.value as DiceRoll) = newDiceRoll;
            setDiceRoll(updatedDiceRoll);
          }}
        />
      )}
    </div>
  );
}
