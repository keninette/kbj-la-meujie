import { ChapterType } from '@/model/chapter.type';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { getChapterSteps } from '@/lib/adventures/steps/frontiere-des-tenebres.steps.lib';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getChapterById } from '@/lib/adventures/frontiere-des-tenebres.lib';
import React from 'react';
import ChapterTreeItem from '@/components/sidenav/ChapterTreeItem';
import StepTreeItem from '@/components/sidenav/StepTreeItem';
import { StepType } from '@/model/step.type';

type SidenavPropsType = {
  chapters: ChapterType[];
  onStepSelection: (activeStep: StepType) => void;
};

// todo pre-selected chapter
// todo style
export default function Sidenav({ chapters, onStepSelection }: SidenavPropsType) {
  return (
    <div className='h-screen sticky top-0'>
      <TreeView
        aria-label='multi-select'
        defaultCollapseIcon={<FontAwesomeIcon icon={faChevronDown} />}
        defaultExpandIcon={<FontAwesomeIcon icon={faChevronRight} />}
        multiSelect
      >
        {chapters.map((chapter: ChapterType) => (
          <ChapterTreeItem key={chapter.id} nodeId={chapter.id} label={chapter.name}>
            {getChapterSteps(chapter.id).map((step) => (
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
