import { TreeView } from '@mui/x-tree-view';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ChapterTreeItem from '@/components/sidenav/ChapterTreeItem';
import StepTreeItem from '@/components/sidenav/StepTreeItem';
import { Chapter } from '@/model/Chapter.class';
import { Step } from '@/model/Step.class';

type SidenavPropsType = {
  adventureSlug: string;
  chapters: Chapter[];
  onStepSelection: (activeStep: Step) => void;
};

// todo pre-selected chapter
// todo style
export default function Sidenav({ adventureSlug, chapters, onStepSelection }: SidenavPropsType) {
  return (
    <div className='h-screen sticky top-0'>
      <TreeView
        aria-label='multi-select'
        defaultCollapseIcon={<FontAwesomeIcon icon={faChevronDown} />}
        defaultExpandIcon={<FontAwesomeIcon icon={faChevronRight} />}
        multiSelect
      >
        {chapters.map((chapter: Chapter) => (
          <ChapterTreeItem key={chapter.id} nodeId={`${adventureSlug}|${chapter.id}`} label={chapter.name}>
            {chapter.steps.map((step: Step) => (
              <StepTreeItem
                key={step.id}
                nodeId={step.id}
                label={step.description}
                onClick={() => onStepSelection(step)}
              />
            ))}
          </ChapterTreeItem>
        ))}
      </TreeView>
    </div>
  );
}
