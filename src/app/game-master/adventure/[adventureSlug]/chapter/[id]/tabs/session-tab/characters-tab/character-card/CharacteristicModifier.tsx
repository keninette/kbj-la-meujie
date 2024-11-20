import React from 'react';

type CharacteristicModifierProps = {
  label: string | React.JSX.Element;
  currentValue: number;
  maxValue: number;
  displayWarning: boolean;
  displayDanger: boolean;
  onIncrementCallback: () => void;
  onDecrementCallback: () => void;
  isEditable: boolean;
};
export default function CharacteristicModifier({
  label,
  currentValue,
  maxValue,
  displayWarning,
  displayDanger,
  onIncrementCallback,
  onDecrementCallback,
  isEditable,
}: CharacteristicModifierProps) {
  return (
    <div className='flex w-full'>
      <p
        className={`font-bold flex-grow w-6 ${displayWarning && !displayDanger && 'text-orange-400'} ${
          displayDanger && 'text-red-500'
        }`}
      >
        {label}
      </p>
      <div className='flex'>
        {isEditable && <button onClick={onDecrementCallback}>➖</button>}
        <p className='flex justify-center w-6'>{currentValue}</p>
        {isEditable && <button onClick={onIncrementCallback}>➕</button>}
      </div>
      <p>/ {maxValue}</p>
    </div>
  );
}
