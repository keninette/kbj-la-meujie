import { Session } from '@/model/session/session.class';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export type SessionInfoProps = {
  session: Session;
  setSession: Dispatch<SetStateAction<Session | undefined>>;
  onSubmitCallback: () => void;
};
export default function SessionInfoForm({ session, setSession, onSubmitCallback }: SessionInfoProps) {
  const onChange = (fieldName: string, value: string) => {
    setSession((prevState) => ({ ...prevState, [fieldName]: value }) as Session);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback();
  };

  return (
    <div className='flex flex-col w-full'>
      <h3 className='flex justify-center text-lg underline my-4 font-bold'>Éditer la session</h3>
      <form onSubmit={onSubmit} className='flex flex-col'>
        <input
          className='text-black'
          type='text'
          name='name'
          id='name'
          placeholder='Nom'
          onChange={(e) => onChange('name', e.target.value)}
          value={session.name}
        />
        <button type='submit'>Ajouter</button>
      </form>
    </div>
  );
}
