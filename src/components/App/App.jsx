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
  ProtectedRoute,
} from '../';

import { AuthContext } from '../../context/';
import { routes, authErrorMessages, infoTooltpOptions } from '../../utils/constants';
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
    const pathesWithHeaderAndFooter = [routes.main, routes.movies, routes.savedMovies];
    const pathesWithHeaderWithoutFooter = [routes.profile];
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
        setInfoTooltipData(infoTooltpOptions.profileСhanged);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setInfoTooltipData(infoTooltpOptions.failure);
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
        localStorage.setItem('preauthorization', JSON.stringify(true));
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

  function clearStorage() {
    localStorage.removeItem('preauthorization');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('resultMovies');
    localStorage.removeItem('searchText');
    localStorage.removeItem('searchSavedMoviesText');
    localStorage.removeItem('filterShortMovies');
    localStorage.removeItem('filterShortSavedMovies');
  }

  function handleLogout() {
    logout().then((res) => {
      setLoggedIn(false);
      navigate(routes.main);
      clearStorage();
    });
  }

  return (
    <AuthContext.Provider
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
          <Route path={routes.main} exact element={<Main />} />
          <Route
            path={routes.movies}
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.savedMovies}
            element={
              <ProtectedRoute>
                <SavedMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.profile}
            element={
              <ProtectedRoute>
                <Profile onUpdateUser={handleUpdateUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
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
