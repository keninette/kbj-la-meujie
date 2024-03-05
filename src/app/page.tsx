'use client';

import Header from '@/components/header/Header';
import Adventures from '@/components/adventures/Adventures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import LoginForm from '@/components/forms/LoginForm';
import { isUserLoggedIn, logInUser, logOutUser } from '@/security/login';
import Routes from '@/app/routes';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      {!isLoggedIn && <LoginForm loginCallback={setIsLoggedIn} />}
      {isLoggedIn && (
        <ul className='flex w-full mx-8'>
          <Adventures />
          <li className='flex ml-6'>
            <a
              href={Routes.newAdventure.path}
              className='relative flex flex-col justify-center items-center  w-[300px] h-[300px] mt-8 bg-black bg-opacity-30 border-gradient border-gradient--red--to-right justify-between items-center p-2'
            >
              <FontAwesomeIcon icon={faPlus} size='8x' className='mx-2' />
              <p className=''>Nouvelle aventure</p>
            </a>
          </li>
        </ul>
      )}
    </main>
  );
}
