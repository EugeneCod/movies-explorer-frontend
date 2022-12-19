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
} from '../';

import { routes } from '../../utils/constants';
import { register, login } from '../../utils/mainApi'

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageWithHeader, setPageWithHeader] = useState(true);
  const [pageWithFooter, setPageWithFooter] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  function handleRegistration(name, email, password) {
    setIsLoading(true);
      register(name, email, password)
      .then((res) => {
        // setInfoTooltipData(infoTooltpOptions.approval);
        // setIsInfoTooltipOpen(true);
        handleLogin(email, password);
      })
      .catch((err) => {
        // setInfoTooltipData(infoTooltpOptions.failure);
        // setIsInfoTooltipOpen(true);
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
        // localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate(routes.movies)
      })
      .catch(err => {
        console.log(err);
        // setInfoTooltipData(infoTooltpOptions.failure);
        // setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin() {
    setIsLoading(true);
  }

  return (
    <div className="app">
      {pageWithHeader && <Header />}
      <Routes>
        <Route path={routes.main} exact element={<Main />} />
        <Route path={routes.movies} element={<Movies />} />
        <Route path={routes.savedMovies} element={<SavedMovies />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route
          path={routes.signup}
          element={
            <Register
              buttonText={!isLoading ? 'Зарегистрироваться' : 'Выполнение...'}
              onRegistration={handleRegistration}
            />
          }
        />
        <Route
          path={routes.signin}
          element={
            <Login
              buttonText={!isLoading ? 'Войти' : 'Выполнение...'}
              onLogin={handleLogin}
            />
          }
        />
        <Route path={routes.unassigned} element={<ErrorPage />}></Route>
      </Routes>
      {pageWithFooter && <Footer />}
    </div>
  );
}

export default App;
