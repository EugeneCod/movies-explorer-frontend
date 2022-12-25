import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
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
  ProtectedRoute,
} from '../';

import { CurrentUserContext } from '../../context/';
import { ROUTES, AUTH_ERROR_MESSAGES, INFO_TOOLTIP_OPTIONS } from '../../utils/constants';
import {
  register,
  login,
  logout,
  getUserInfo,
  updateUserInfo,
  getSavedMovies,
} from '../../utils/mainApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [pageWithHeader, setPageWithHeader] = useState(true);
  const [pageWithFooter, setPageWithFooter] = useState(true);
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('preauthorization')));
  const [isLoading, setIsLoading] = useState(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');
  const [loginErrorMessage, setLogintionErrorMessage] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({ text: '', imageName: '' });
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({ email: '', name: '' });

  useEffect(() => {
    const pathesWithHeaderAndFooter = [ROUTES.MAIN, ROUTES.MOVIES, ROUTES.SAVED_MOVIES];
    const pathesWithHeaderWithoutFooter = [ROUTES.PROFILE];
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

  useEffect(() => {
    getUserInfo()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
        getSavedMovies()
          .then((moviesData) => {
            setSavedMovies(moviesData);
          })
          .catch((err) => console.log(`${err} при загрузке сохраненных фильмов`));
      })
      .catch((err) => {
        console.log(`${err} при получении информации о пользователе`);
        setLoggedIn(false);
      });
  }, []);

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(name, email) {
    setIsLoading(true);
    updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        setInfoTooltipData(INFO_TOOLTIP_OPTIONS.PROFILE_CHANGED);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setInfoTooltipData(INFO_TOOLTIP_OPTIONS.PROFILE_CHANGED);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          err.status === 409 ? AUTH_ERROR_MESSAGES.EMAIL_CONFLICT : AUTH_ERROR_MESSAGES.UNIDENTIFIED,
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
        localStorage.setItem('preauthorization', JSON.stringify(true));
        setLoggedIn(true);
        navigate(ROUTES.MOVIES);
        setLogintionErrorMessage('');
      })
      .catch((err) => {
        setLogintionErrorMessage(AUTH_ERROR_MESSAGES.UNIDENTIFIED);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function clearStorage() {
    localStorage.removeItem('preauthorization');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('resultMovies');
    localStorage.removeItem('searchText');
    // localStorage.removeItem('searchSavedMoviesText');
    localStorage.removeItem('filterShortMovies');
    // localStorage.removeItem('filterShortSavedMovies');
  }

  function handleLogout() {
    logout().then((res) => {
      setLoggedIn(false);
      navigate(ROUTES.MAIN);
      clearStorage();
    });
  }

  return (
    <CurrentUserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        currentUser,
        savedMovies,
        setSavedMovies,
        isLoading,
      }}>
      <div className="app">
        {pageWithHeader && <Header />}
        <Routes>
          <Route path={ROUTES.MAIN} exact element={<Main />} />
          <Route
            path={ROUTES.MOVIES}
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SAVED_MOVIES}
            element={
              <ProtectedRoute>
                <SavedMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <Profile onUpdateUser={handleUpdateUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SIGNUP}
            element={
              loggedIn ? (
                <Navigate to={ROUTES.MAIN} />
              ) : (
                <Register
                  buttonText={!isLoading ? 'Зарегистрироваться' : 'Выполнение...'}
                  onRegistration={handleRegistration}
                  registrationError={registrationErrorMessage}
                />
              )
            }
          />
          <Route
            path={ROUTES.SIGNIN}
            element={
              loggedIn ? (
                <Navigate to={ROUTES.MAIN} />
              ) : (
                <Login
                  buttonText={!isLoading ? 'Войти' : 'Выполнение...'}
                  onLogin={handleLogin}
                  registrationError={loginErrorMessage}
                />
              )
            }
          />
          <Route path={ROUTES.UNASSIGNED} element={<ErrorPage />}></Route>
        </Routes>
        {pageWithFooter && <Footer />}
        <PopupWithInfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          data={infoTooltipData}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
