'use client';
import { getChapterStepById } from '@/lib/adventures/steps/frontiere-des-tenebres.steps.lib';
import Step from '@/components/step/Step';
import React from 'react';
import { ArrowCoordinatesType } from '@/app/adventure/chapter/page';
import Xarrow from 'react-xarrows';

type RecursiveStepPropsType = {
  stepIds: string[];
};

export default function RecursiveSteps({ stepIds }: RecursiveStepPropsType) {
  const arrows: ArrowCoordinatesType[] = [];

  const renderSteps = (currentStepIds: string[], parentKey?: string) => {
    const steps = currentStepIds.map((stepId) => getChapterStepById(stepId));
    const domElements: React.JSX.Element[] = [];

    steps.forEach((step) => {
      const uniqueStepKey = `step--${parentKey || ''}__${step.id}`;
      if (parentKey) {
        arrows.push({ id: `${parentKey}_${step.id}`, start: parentKey, end: uniqueStepKey });
      }
      domElements.push(
        <div key={step.id} className='flex flex-col w-full'>
          <Step stepData={step} uniqueStepKey={uniqueStepKey} />
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
