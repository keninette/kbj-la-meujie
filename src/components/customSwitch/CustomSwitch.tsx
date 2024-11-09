import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { MuiThemes } from '@/model/types/external-libs.type';

type customSwitchProps = {
  label: string;
  onToggle: (isChecked: boolean) => void;
  isCheckedByDefault: boolean;
  size?: 'small';
  color?: MuiThemes;
};
export default function CustomSwitch({ label, onToggle, isCheckedByDefault, size, color }: customSwitchProps) {
  const [isChecked, setIsChecked] = useState<boolean>(isCheckedByDefault);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onToggle(event.target.checked);
  };

  return (
    <div className='flex items-center'>
      <Switch
        checked={isChecked}
        size={size}
        color={color ?? 'primary'}
        inputProps={{ 'aria-label': label }}
        onChange={handleChange}
      />
      <p className='flex text-sm items-center'>{label}</p>
    </div>
  );
}
