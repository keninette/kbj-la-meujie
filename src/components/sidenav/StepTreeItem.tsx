import React from 'react';
import { TreeItem, TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/x-tree-view';
import clsx from 'clsx';
import './sidenav.css';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// todo clean code
const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
  const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props;

  const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } =
    useTreeItem(nodeId);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
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
      onClick={props.onClick}
    >
      <div className='sidenav__item'>
        <FontAwesomeIcon icon={faBookmark} size='xs' className='mx-2 sidenav__item--level-0 sidenav__item__bookmark' />
        {props.label}
      </div>
    </div>
  );
});

const StepTreeItem = React.forwardRef(function ChapterTreeItem(props: TreeItemProps, ref: React.Ref<HTMLLIElement>) {
  return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});

export default StepTreeItem;
