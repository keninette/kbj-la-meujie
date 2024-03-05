import { FormEvent, SetStateAction, useState } from 'react';
import { logInUser } from '@/security/login';

type LoginFormProps = {
  loginCallback: (isLoggedIn: boolean) => void;
};

export default function LoginForm({ loginCallback }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const submitCallback = (e: FormEvent) => {
    const areCredentialsValid = password === 'kbjkbjkbj';
    e.preventDefault();
    loginCallback(areCredentialsValid);
    if (areCredentialsValid) {
      logInUser();
    }
  };

  return (
    <form onSubmit={submitCallback} className='flex flex-col w-full h-full justify-center items-center'>
      <input
        className='flex w-48 my-2 text-black'
        type='password'
        value={password}
        name='password'
        placeholder='Mot de passe'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className='flex w-36 my-2 justify-center items-center border-gradient border-gradient--red--to-right'
        type='submit'
      >
        Se connecter
      </button>
    </form>
  );
}
