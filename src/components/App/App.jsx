import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  const location = useLocation();
  const [pageWithHeader, setPageWithHeader] = useState(true);
  const [pageWithFooter, setPageWithFooter] = useState(true);

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
  
  return (
    <div className="app">
      {pageWithHeader && <Header />}
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      {pageWithFooter && <Footer />}
    </div>
  );
}

export default App;
