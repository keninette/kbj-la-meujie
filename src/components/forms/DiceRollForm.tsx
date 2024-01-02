import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Step } from '@/model/Step.class';
import { DiceRoll, DiceRollCallbackTypeEnum } from '@/model/DiceRoll.class';
import { CharacteristicEnum } from '@/model/characteristic.enum';

type StepFormProps = {
  step: Step;
  setStep: Dispatch<SetStateAction<Step>>;
};
export default function DiceRollForm({ step, setStep }: StepFormProps) {
  const [diceRoll, setDiceRoll] = useState<DiceRoll>(new DiceRoll('1d100', []));
  const [onSuccessDiceRoll, setOnSuccessDiceRoll] = useState<DiceRoll>(new DiceRoll('', []));
  const [onFailDiceRoll, setOnFailDiceRoll] = useState<DiceRoll>(new DiceRoll('', []));

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
      case 'onSuccessType':
        onSuccessDiceRoll.type = value;
        updatedDiceRoll.onSuccess = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onSuccessDiceRoll,
        };
        break;
      case 'onSuccessCharacteristics':
        onSuccessDiceRoll.characteristic.push(value as CharacteristicEnum);
        updatedDiceRoll.onSuccess = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onSuccessDiceRoll,
        };
        break;
      case 'onSuccessCondition':
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
      case 'onFailType':
        onFailDiceRoll.type = value;
        updatedDiceRoll.onFail = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onFailDiceRoll,
        };
        break;
      case 'onFailCharacteristics':
        onFailDiceRoll.characteristic.push(value as CharacteristicEnum);
        updatedDiceRoll.onFail = {
          type: DiceRollCallbackTypeEnum.DICE_ROLL,
          value: onFailDiceRoll,
        };
        break;
      case 'onFailCondition':
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

  console.log(diceRoll);

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
  };

  return (
    <form className='flex w-full ml-4' onSubmit={(e) => onSubmit(e)}>
      <div className='flex flex-col h-full w-full'>
        <h3>Ajouter un jet de dé</h3>
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
            <option value='string'>Entrer un texte</option>
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
          {diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
            <>
              {typeInput(diceRoll.onSuccess.type, (e) => onChange('onSuccessType', e.target.value))}
              {characteristicsInput(diceRoll.onSuccess.value?.characteristic || [], (e) =>
                onChange('onSuccessCharacteristics', e.target.value),
              )}
              {conditionInput(diceRoll.onSuccess.value?.condition || '', (e) => onChange('condition', e.target.value))}
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
            <option value='string'>Entrer un texte</option>
            <option value='diceRoll'>Ajouter un jet de dé</option>
          </select>
          {diceRoll.onFail.type === DiceRollCallbackTypeEnum.TEXT && (
            <input
              type='text'
              name='onFail'
              placeholder='On success'
              value={diceRoll.onFail || ''}
              onChange={(e) => onChange('onFailText', e.target.value)}
              className='flex text-black'
              required
            />
          )}
          {onFailType === 'diceRoll' && (
            <>
              {typeInput(diceRoll.onFail?.type, (e) => onChange('onFailType', e.target.value))}
              {characteristicsInput(diceRoll.onFail.value.characteristic, (e) =>
                onChange('onFailCharacteritics', e.target.value),
              )}
              {conditionInput(diceRoll.onFail?.value.condition, (e) => onChange('onFailCondition', e.target.value))}
            </>
          )}
        </div>
        <button type='submit'>Ajouter</button>
      </div>
    </form>
  );
}
