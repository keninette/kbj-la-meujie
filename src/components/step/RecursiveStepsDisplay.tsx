'use client';
import StepDisplay from '@/components/step/step-display/StepDisplay';
import React from 'react';
import Xarrow from 'react-xarrows';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';
import { ArrowCoordinatesType } from '@/model/types/arrow-coordinates.type';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';

type RecursiveStepPropsType = {
  stepIds: string[];
  chapter: Chapter;
};

export default function RecursiveStepsDisplay({ stepIds, chapter }: RecursiveStepPropsType) {
  const arrows: ArrowCoordinatesType[] = [];

  const renderSteps = (currentStepIds: string[], parentKey?: string) => {
    const steps = chapter.steps?.filter((thisStep: Step) => currentStepIds.includes(thisStep.id));
    const domElements: React.JSX.Element[] = [];

    steps.forEach((step: Step) => {
      const uniqueStepKey = `step--${parentKey || ''}__${step.id}`;
      if (parentKey) {
        arrows.push({ id: `${parentKey}_${step.id}`, start: parentKey, end: uniqueStepKey });
      }
      domElements.push(
        <div key={step.id} className='flex flex-col w-max items-center'>
          <StepDisplay step={step} uniqueStepKey={uniqueStepKey} referer={'adventure'} />
          {step.nextStepsIds && <div className='flex'>{renderSteps(step?.nextStepsIds, uniqueStepKey)}</div>}
        </div>,
      );
    });

    return domElements;
  };

  return (
    <>
      {renderSteps(stepIds)}
      {arrows.map((edge) => {
        return (
          <div key={`arrow-wrapper_${edge.id}`}>
            <Xarrow
              key={edge.id}
              start={edge.start}
              end={edge.end}
              color='white'
              strokeWidth={2}
              path='grid'
              zIndex={1}
              startAnchor={'bottom'}
              endAnchor={'top'}
            ></Xarrow>
          </div>
        );
      })}
    </>
  );
}
