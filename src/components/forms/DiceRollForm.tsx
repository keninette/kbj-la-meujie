import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Step } from '@/model/Step.class';
import { DiceRoll, DiceRollCallbackTypeEnum } from '@/model/DiceRoll.class';
import { CharacteristicEnum } from '@/model/characteristic.enum';
import { StepSubFormProps } from '@/components/forms/StepForm';

export default function DiceRollForm({ step, setStep }: StepSubFormProps) {
  // todo recursive dice roll
  const [diceRoll, setDiceRoll] = useState<DiceRoll>(new DiceRoll('1d100', []));
  const [onSuccessDiceRoll, setOnSuccessDiceRoll] = useState<DiceRoll>(new DiceRoll('1d100', []));
  const [onFailDiceRoll, setOnFailDiceRoll] = useState<DiceRoll>(new DiceRoll('1d100', []));

  const onChange = (fieldName: string, value: string | CharacteristicEnum) => {
    const updatedDiceRoll: DiceRoll = { ...diceRoll };

    switch (fieldName) {
      case 'characteristics':
        updatedDiceRoll.characteristic.push(value as CharacteristicEnum);
        break;
      case 'onSuccessText':
        updatedDiceRoll.onSuccess = {
          type: DiceRollCallbackTypeEnum.TEXT,
          value: value,
        };
        break;
      case 'onSuccessClue':
        updatedDiceRoll.onSuccess = {
          type: DiceRollCallbackTypeEnum.CLUE,
          value: value,
        };
        break;
      case 'onSuccessType':
        updatedDiceRoll.onSuccess = {
          type: value as DiceRollCallbackTypeEnum,
          value: DiceRollCallbackTypeEnum.DICE_ROLL === value ? onSuccessDiceRoll : '',
        };
        break;
      case 'onSuccessDicerollType':
        onSuccessDiceRoll.type = value;
        updatedDiceRoll.onSuccess = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onSuccessDiceRoll,
        };
        break;
      case 'onSuccessDicerollCharacteristics':
        onSuccessDiceRoll.characteristic.push(value as CharacteristicEnum);
        updatedDiceRoll.onSuccess = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onSuccessDiceRoll,
        };
        break;
      case 'onSuccessDicerollCondition':
        onSuccessDiceRoll.condition = value;
        updatedDiceRoll.onSuccess = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onSuccessDiceRoll,
        };
        break;
      case 'onFailText':
        updatedDiceRoll.onFail = {
          type: DiceRollCallbackTypeEnum.TEXT,
          value: value,
        };
        break;
      case 'onFailClue':
        updatedDiceRoll.onFail = {
          type: DiceRollCallbackTypeEnum.CLUE,
          value: value,
        };
        break;
      case 'onFailType':
        updatedDiceRoll.onFail = {
          type: value as DiceRollCallbackTypeEnum,
          value: DiceRollCallbackTypeEnum.DICE_ROLL === value ? onFailDiceRoll : '',
        };
        break;
      case 'onFailDicerollType':
        onFailDiceRoll.type = value;
        updatedDiceRoll.onFail = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onFailDiceRoll,
        };
        break;
      case 'onFailDicerollCharacteristics':
        onFailDiceRoll.characteristic.push(value as CharacteristicEnum);
        updatedDiceRoll.onFail = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onFailDiceRoll,
        };
        break;
      case 'onFailDicerollCondition':
        onFailDiceRoll.condition = value;
        updatedDiceRoll.onFail = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onFailDiceRoll,
        };
        break;
      default:
        // @ts-ignore
        updatedDiceRoll[fieldName] = value;
        break;
    }

    setDiceRoll(updatedDiceRoll);
  };

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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedStep: Step = { ...step };
    if (!updatedStep.diceRolls) {
      updatedStep.diceRolls = [];
    }
    updatedStep.diceRolls.push(diceRoll);

    setStep(updatedStep);
    setDiceRoll(new DiceRoll('1d100', []));
  };

  return (
    <form className='flex w-full ml-4' onSubmit={(e) => onSubmit(e)}>
      <div className='flex flex-col h-full w-full'>
        <h4>Ajouter un jet de dé</h4>
        {typeInput(diceRoll.type, (e) => {
          onChange('type', e.target.value);
        })}
        {characteristicsInput(diceRoll.characteristic, (e) => onChange('characteristics', e.target.value))}
        {conditionInput(diceRoll.condition || '', (e) => onChange('condition', e.target.value))}
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
            required
          >
            <option value={DiceRollCallbackTypeEnum.TEXT}>Entrer un texte</option>
            <option value={DiceRollCallbackTypeEnum.DICE_ROLL}>Ajouter un jet de dé</option>
            <option value={DiceRollCallbackTypeEnum.CLUE}>Donner un indice</option>
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
            <>
              {typeInput(diceRoll.onSuccess.value?.type, (e) => onChange('onSuccessDicerollType', e.target.value))}
              {characteristicsInput(diceRoll.onSuccess.value?.characteristic || [], (e) =>
                onChange('onSuccessDicerollCharacteristics', e.target.value),
              )}
              {conditionInput(diceRoll.onSuccess.value?.condition || '', (e) =>
                onChange('onSuccessDicerollCondition', e.target.value),
              )}
            </>
          )}
        </div>
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
            required
          >
            <option value={DiceRollCallbackTypeEnum.TEXT}>Entrer un texte</option>
            <option value={DiceRollCallbackTypeEnum.DICE_ROLL}>Ajouter un jet de dé</option>
            <option value={DiceRollCallbackTypeEnum.CLUE}>Donner un indice</option>
          </select>
          {diceRoll.onFail.type === DiceRollCallbackTypeEnum.TEXT && (
            <input
              type='text'
              name='onFail'
              placeholder='On success'
              value={diceRoll.onFail.value || ''}
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
              value={diceRoll.onFail.value || ''}
              onChange={(e) => onChange('onFailClue', e.target.value)}
              className='flex text-black'
              required
            />
          )}
          {diceRoll.onFail.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
            <>
              {typeInput(diceRoll.onFail.value?.type, (e) => onChange('onFailDicerollType', e.target.value))}
              {characteristicsInput(diceRoll.onFail.value?.characteristic, (e) =>
                onChange('onFailDicerollCharacteristics', e.target.value),
              )}
              {conditionInput(diceRoll.onFail?.value.condition || '', (e) =>
                onChange('onFailDicerollCondition', e.target.value),
              )}
            </>
          )}
        </div>
        <button className='mt-2 mb-4' type='submit'>
          Ajouter
        </button>
      </div>
    </form>
  );
}
