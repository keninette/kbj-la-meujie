import { getChapterById } from '@/lib/adventures/frontiere-des-tenebres.lib';
import React from 'react';
import { TreeItem, TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/x-tree-view';
import ChapterNavItem from '@/components/sidenav/ChapterNavItem';
import { ChapterType } from '@/model/chapter.type';
import clsx from 'clsx';
import { step } from 'next/dist/experimental/testmode/playwright/step';
import { getChapterStep, getChapterSteps } from '@/lib/adventures/steps/frontiere-des-tenebres.steps.lib';

const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
  const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props;

  const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } =
    useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleSelection(event);
  };

  const onStepClick = (nodeId: string) => {
    console.log(nodeId);
    const step = getChapterStep(nodeId);
    console.log(step);
  };

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
      onClick={() => onStepClick(props.nodeId)}
    >
      <div>{props.label}</div>
    </div>
  );
});

const StepTreeItem = React.forwardRef(function ChapterTreeItem(props: TreeItemProps, ref: React.Ref<HTMLLIElement>) {
  return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});

export default StepTreeItem;
