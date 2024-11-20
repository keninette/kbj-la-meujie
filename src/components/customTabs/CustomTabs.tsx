import React, { HTMLAttributes, ReactElement, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from '@/components/customTabs/CustomTabPanel';
import { MuiTabThemes, MuiThemes } from '@/model/types/external-libs.type';

export type TabType = {
  id: string;
  title: string;
  content: ReactElement;
  disabled?: boolean;
};

interface TabsProps extends HTMLAttributes<HTMLElement> {
  tabs: TabType[];
  color?: MuiTabThemes;
}

// to do all components should extend HTML attributes
export default function CustomTabs({ tabs, color, ...rest }: TabsProps): ReactElement {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
    setActiveTabIndex(newIndex);
  };

  return (
    <div className='flex flex-col w-full' {...rest}>
      <Tabs
        value={activeTabIndex}
        onChange={handleChange}
        aria-label='session-step-tabs'
        textColor={color ?? MuiThemes.PRIMARY}
        indicatorColor={color ?? MuiThemes.PRIMARY}
      >
        {tabs.map((tab: TabType) => {
          return (
            <Tab
              label={tab.title}
              key={`session-step-tab--${tab.id}`}
              id={`session-step-tab--${tab.id}`}
              aria-controls={`session-step-tab--${tab.id}`}
              disabled={tab.disabled ?? false}
            />
          );
        })}
      </Tabs>
      {tabs.map((tab: TabType, index: number) => {
        return (
          <CustomTabPanel
            key={`session-step-tab-panel__container--${tab.id}`}
            isHidden={activeTabIndex !== index}
            tab={tab}
          />
        );
      })}
    </div>
  );
}
