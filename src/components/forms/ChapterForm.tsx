import { FormEvent, useEffect, useState } from 'react';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';

type ChapterFormProps = {
  onSubmitCallback: (updatedChapter: Chapter) => void;
  nextChapterId: string;
  requestedChapter?: Chapter;
};
export default function ChapterForm({ onSubmitCallback, nextChapterId, requestedChapter }: ChapterFormProps) {
  const [chapter, setChapter] = useState<Chapter>(Chapter.getEmptyChapter());
  const onFormChange = (fieldName: string, value: string) => {
    const updatedChapter: Chapter = { ...chapter };
    // @ts-ignore
    updatedChapter[fieldName] = value;
    setChapter(updatedChapter);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(chapter);
  };

  // Init chapter with the one passed as props if it exists
  useEffect(() => {
    if (requestedChapter) {
      setChapter(requestedChapter);
    }
  }, [requestedChapter]);

  // Display form
  return (
    <form className='flex flex-col mt-8' onSubmit={onSubmit}>
      <h3 className='my-4'>Ajouter un châpitre ({nextChapterId})</h3>
      <div className='flex flex-col w-full'>
        <label htmlFor='name' className='text-white'>
          Nom
        </label>
        <input
          type='text'
          name='name'
          placeholder='Nom'
          value={chapter.name}
          onChange={(e) => onFormChange('name', e.target.value)}
          className='flex text-black w-full'
          required
        />
      </div>
      <div className='flex flex-col w-full mt-2'>
        <label htmlFor='nextChapterId' className='text-white'>
          ID du prochain châpitre
        </label>
        <input
          type='text'
          name='nextChapterId'
          placeholder='ID du prochain châpitre'
          value={chapter.nextChapterId || ''}
          onChange={(e) => onFormChange('nextChapterId', e.target.value)}
          className='flex text-black w-full'
        />
      </div>
      <button type='submit'>Enregistrer</button>
    </form>
  );
}
