import { RawDraftContentState } from 'react-draft-wysiwyg';
import React from 'react';
import { CustomControlledEditor } from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/tabs/session-tab/description-tab/CustomControlledEditor';

type DescriptionTabProps = {
  description?: RawDraftContentState;
  onDescriptionChange: (description?: RawDraftContentState) => void;
};
export default function DescriptionTab({ description, onDescriptionChange }: DescriptionTabProps) {
  return (
    <div className='flex flex-grow justify-center bg-white text-black'>
      <CustomControlledEditor sessionDescription={description} onContentStateCallback={onDescriptionChange} />
    </div>
  );
}
