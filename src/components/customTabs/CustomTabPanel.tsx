import React, { ReactElement, useState } from 'react';
import { TabType } from '@/components/customTabs/CustomTabs';

type CustomTabPanelPropsType = {
  tab: TabType;
  isHidden: boolean;
};
export default function CustomTabPanel({ tab, isHidden }: CustomTabPanelPropsType): ReactElement {
  return (
    <div
      role='tabpanel'
      hidden={isHidden}
      id={`session-step-tab-panel--${tab.id}`}
      aria-labelledby={`session-step-tab-panel--${tab.id}`}
      className='h-full p-2'
    >
      {tab.content}
    </div>
  );
}
