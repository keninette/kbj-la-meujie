import { TreeView } from '@mui/x-tree-view';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ChapterTreeItem from '@/components/sidenav/ChapterTreeItem';
import StepTreeItem from '@/components/sidenav/StepTreeItem';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';

type SidenavPropsType = {
  adventureSlug: string;
  storyArcSlug: string;
  chapters: Chapter[];
  onStepSelection: (activeStep: Step) => void;
};

// todo pre-selected chapter
// todo style
export default function Sidenav({ adventureSlug, storyArcSlug, chapters, onStepSelection }: SidenavPropsType) {
  return (
    <div className='h-screen sticky min-w-[300px] max-w-[400px] w-auto top-0'>
      <h3 className='m-4 text-xl'>Sommaire</h3>
      <TreeView
        aria-label='multi-select'
        defaultCollapseIcon={<FontAwesomeIcon icon={faChevronDown} />}
        defaultExpandIcon={<FontAwesomeIcon icon={faChevronRight} />}
        multiSelect
      >
        {chapters.map((chapter: Chapter) => (
          <ChapterTreeItem
            key={chapter.id}
            nodeId={`${adventureSlug}|${storyArcSlug}|${chapter.id}`}
            label={chapter.name}
          >
            {chapter.steps
              .filter((step: Step) => step.level === 1)
              .map((step: Step) => (
                <StepTreeItem
                  key={step.id}
                  nodeId={step.id}
                  label={`📘 ${step.title}`}
                  onClick={() => onStepSelection(step)}
                />
              ))}
          </ChapterTreeItem>
        ))}
      </TreeView>
    </div>
  );
}
