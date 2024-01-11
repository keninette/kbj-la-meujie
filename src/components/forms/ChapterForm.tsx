import { Chapter } from '@/model/Chapter.class';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Adventure } from '@/model/Adventure.class';
import { saveAdventure } from '@/app/data-provider';

type ChapterFormProps = {
  adventure: Adventure;
  chapter: Chapter;
  setChapter: Dispatch<SetStateAction<Chapter>>;
};
export default function ChapterForm({ adventure, chapter, setChapter }: ChapterFormProps) {
  // todo refactor this, it's always the same
  const onChange = (fieldName: string, value: string) => {
    const updatedChapter: Chapter = { ...chapter };
    // @ts-ignore
    updatedChapter[fieldName] = value;
    setChapter(updatedChapter);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    adventure.addChapter(chapter);
    const response = await saveAdventure(adventure);
    if (response.status !== 201) {
      console.error(response);
      alert('Erreur');
    }
    setChapter(new Chapter('', '', []));
  };

  return (
    <form className='flex flex-col mt-8' onSubmit={(e) => onSubmit(e)}>
      <h3 className='my-4'>Ajouter un châpitre ({adventure && adventure.computeNextChapterId()})</h3>
      <div className='flex flex-col w-full'>
        <label htmlFor='name' className='text-white'>
          Nom
        </label>
        <input
          type='text'
          name='name'
          placeholder='Nom'
          value={chapter.name}
          onChange={(e) => onChange('name', e.target.value)}
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
          onChange={(e) => onChange('nextChapterId', e.target.value)}
          className='flex text-black w-full'
        />
      </div>
      <button type='submit'>Enregistrer</button>
    </form>
  );
}
