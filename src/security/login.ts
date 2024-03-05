const localStorageKey = 'isUserLoggedIn';

const isUserLoggedIn = () => {
  return localStorage.getItem(localStorageKey) === 'yup';
};

const logInUser = () => {
  localStorage.setItem(localStorageKey, 'yup');
};

const logOutUser = () => {
  localStorage.setItem(localStorageKey, 'nope');
};

export { isUserLoggedIn, logInUser, logOutUser };
