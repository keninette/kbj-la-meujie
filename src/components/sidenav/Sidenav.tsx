import { TreeView } from '@mui/x-tree-view';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import ChapterTreeItem from '@/components/sidenav/ChapterTreeItem';
import StepTreeItem from '@/components/sidenav/StepTreeItem';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';
import CustomSwitch from '@/components/customSwitch/CustomSwitch';

type SidenavPropsType = {
  adventureSlug: string;
  chapters: Chapter[];
  selectedChapter?: Chapter;
  onStepSelection: (activeStep: Step) => void;
  className: string;
};

// todo style
export default function Sidenav({
  adventureSlug,
  chapters,
  selectedChapter,
  onStepSelection,
  className,
}: SidenavPropsType) {
  const [allowMultiSelect, setAllowMultiSelect] = useState(false);
  const [expandedNodesIds, setExpandedNodesIds] = useState<string[]>(
    selectedChapter ? [`${adventureSlug}|${selectedChapter.id}`] : [],
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    selectedChapter ? `${adventureSlug}|${selectedChapter.id}` : '',
  );

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAllowMultiSelect(event.target.checked);
  };

  const handleNodeSelect = (event: React.SyntheticEvent) => {
    const nodeId = (event.target as HTMLElement).closest('[data-nodeid]')?.attributes?.getNamedItem('data-nodeid')
      ?.value;
    setSelectedNodeId(nodeId ?? '');
  };

  const handleNodeToggle = (event: SyntheticEvent<Element, Event>, nodeIds: string[]): void => {
    const nodeId = (event.target as HTMLElement).closest('[data-nodeid]')?.attributes?.getNamedItem('data-nodeid')
      ?.value;

    // If this node has just been expanded, & we don't want multi-selection, this should close all the others
    if (nodeId && !allowMultiSelect && nodeIds.length > 0 && nodeIds.includes(nodeId)) {
      setExpandedNodesIds([nodeId]);
    } else {
      setExpandedNodesIds(nodeIds);
    }
  };

  return (
    <div className={`h-screen sticky top-0 ${className} overflow-y-scroll`}>
      <div className='flex justify-between items-center m-2'>
        <h3 className='text-xl'>Sommaire</h3>
        <CustomSwitch
          label={'Multi-select'}
          onToggle={useCallback((isChecked: boolean) => setAllowMultiSelect(isChecked), [])}
          isCheckedByDefault={allowMultiSelect}
          size='small'
        />
      </div>
      <TreeView
        aria-label='multi-select'
        defaultCollapseIcon={<FontAwesomeIcon icon={faChevronDown} />}
        defaultExpandIcon={<FontAwesomeIcon icon={faChevronRight} />}
        expanded={expandedNodesIds}
        selected={selectedNodeId}
        onNodeToggle={handleNodeToggle}
        onNodeSelect={handleNodeSelect}
      >
        {chapters.map((chapter: Chapter) => (
          <ChapterTreeItem
            key={chapter.id}
            nodeId={`${adventureSlug}|${chapter.id}`}
            label={chapter.name}
            className='sidenav__item sidenav__item--level-0'
            data-nodeid={`${adventureSlug}|${chapter.id}`}
          >
            {chapter.steps.map((step: Step) => (
              <StepTreeItem
                key={step.id}
                nodeId={step.id}
                label={`${step.title || ''}`}
                onClick={() => onStepSelection(step)}
                className={`sidenav__item--level-${step.level}`}
              />
            ))}
          </ChapterTreeItem>
        ))}
      </TreeView>
    </div>
  );
}
