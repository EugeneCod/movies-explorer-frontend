import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  ErrorPage,
  Header,
  Main,
  Movies,
  SavedMovies,
  Profile,
  Register,
  Login,
  Footer,
  PopupWithInfoTooltip,
} from '../';

import { AuthContext } from '../../context/';
import { routes, authErrorMessages, infoTooltpOptions } from '../../utils/constants';
import { register, login, getUserInfo, updateUserInfo } from '../../utils/mainApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [pageWithHeader, setPageWithHeader] = useState(true);
  const [pageWithFooter, setPageWithFooter] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');
  const [loginErrorMessage, setLogintionErrorMessage] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({ text: '', imageName: '' });

  const [currentUser, setCurrentUser] = useState({ email: '', name: '' });

  useEffect(() => {
    const pathesWithHeaderAndFooter = ['/', '/movies', '/saved-movies'];
    const pathesWithHeaderWithoutFooter = ['/profile'];
    if (pathesWithHeaderAndFooter.includes(location.pathname)) {
      setPageWithHeader(true);
      setPageWithFooter(true);
      return;
    }
    if (pathesWithHeaderWithoutFooter.includes(location.pathname)) {
      setPageWithHeader(true);
      setPageWithFooter(false);
      return;
    }
    setPageWithHeader(false);
    setPageWithFooter(false);
  }, [location]);

  // useEffect(() => {
  //   loggedIn &&
  //     getUserInfo()
  //       .then((userData) => {
  //         setCurrentUser(userData);
  //       })
  //       .catch((err) => console.log(`${err} при загрузке данных о текущем пользователе`));
  // }, [loggedIn]);

  useEffect(() => {
    getUserInfo()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(name, email) {
    setIsLoading(true);
    updateUserInfo(name, email)
      .then(userData => {
        setCurrentUser(userData);
        setInfoTooltipData(infoTooltpOptions.profileСhanged);
        setIsInfoTooltipOpen(true);
      })
      .catch(err => {
        setInfoTooltipData(infoTooltpOptions.failure);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
    })
  }

  function handleRegistration(name, email, password) {
    setIsLoading(true);
    register(name, email, password)
      .then((res) => {
        handleLogin(email, password);
        setRegistrationErrorMessage('');
      })
      .catch((err) => {
        setRegistrationErrorMessage(
          err.code === 409 ? authErrorMessages.emailConflict : authErrorMessages.unidentified,
        );
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    login(email, password)
      .then((res) => {
        getUserInfo()
          .then((userData) => {
            setCurrentUser(userData);
          })
          .catch((err) => console.log(`${err} при загрузке данных о текущем пользователе`));
        setLoggedIn(true);
        navigate(routes.movies);
        setLogintionErrorMessage('');
      })
      .catch((err) => {
        setLogintionErrorMessage(authErrorMessages.unidentified);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        isLoading,
        currentUser,
      }}>
      <div className="app">
        {pageWithHeader && <Header />}
        <Routes>
          <Route path={routes.main} exact element={<Main />} />
          <Route path={routes.movies} element={<Movies />} />
          <Route path={routes.savedMovies} element={<SavedMovies />} />
          <Route path={routes.profile} element={<Profile onUpdateUser={handleUpdateUser} />} />
          <Route
            path={routes.signup}
            element={
              <Register
                buttonText={!isLoading ? 'Зарегистрироваться' : 'Выполнение...'}
                onRegistration={handleRegistration}
                registrationError={registrationErrorMessage}
              />
            }
          />
          <Route
            path={routes.signin}
            element={
              <Login
                buttonText={!isLoading ? 'Войти' : 'Выполнение...'}
                onLogin={handleLogin}
                registrationError={loginErrorMessage}
              />
            }
          />
          <Route path={routes.unassigned} element={<ErrorPage />}></Route>
        </Routes>
        {pageWithFooter && <Footer />}
        <PopupWithInfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          data={infoTooltipData}
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
