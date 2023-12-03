import { getChapterById } from '@/lib/adventures/frontiere-des-tenebres.lib';
import React from 'react';
import { TreeItem, TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/x-tree-view';
import ChapterNavItem from '@/components/sidenav/ChapterNavItem';
import { ChapterType } from '@/model/chapter.type';
import clsx from 'clsx';

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
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <ChapterNavItem chapter={getChapterById(props.nodeId) as ChapterType} />
    </div>
  );
});

const ChapterTreeItem = React.forwardRef(function ChapterTreeItem(props: TreeItemProps, ref: React.Ref<HTMLLIElement>) {
  return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});

export default ChapterTreeItem;
