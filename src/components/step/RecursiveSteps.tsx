'use client';
import Step from '@/components/step/Step';
import React from 'react';
import Xarrow from 'react-xarrows';
import { ArrowCoordinatesType } from '@/app/adventure/[slug]/chapter/[id]/page';
import { Chapter } from '@/model/Chapter.class';

type RecursiveStepPropsType = {
  stepIds: string[];
  chapter: Chapter;
};

export default function RecursiveSteps({ stepIds, chapter }: RecursiveStepPropsType) {
  const arrows: ArrowCoordinatesType[] = [];

  const renderSteps = (currentStepIds: string[], parentKey?: string) => {
    const steps = chapter.steps?.filter((thisStep) => currentStepIds.includes(thisStep.id));
    const domElements: React.JSX.Element[] = [];

    steps.forEach((step) => {
      const uniqueStepKey = `step--${parentKey || ''}__${step.id}`;
      if (parentKey) {
        arrows.push({ id: `${parentKey}_${step.id}`, start: parentKey, end: uniqueStepKey });
      }
      domElements.push(
        <div key={step.id} className='flex flex-col w-full'>
          <Step step={step} uniqueStepKey={uniqueStepKey} />
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
