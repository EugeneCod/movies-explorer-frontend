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
  const [withHeaderAndFooter, setWithHeaderAndFooter] = useState(true);

  useEffect(() => {
    const pathsToTheMainPages = ['/', '/movies', '/saved-movies'];
    if (pathsToTheMainPages.includes(location.pathname)) {
      setWithHeaderAndFooter(true);
      return;
    }
    setWithHeaderAndFooter(false);
  }, [location]);
  console.log(withHeaderAndFooter);
  return (
    <div className="app">
      {withHeaderAndFooter && <Header />}
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      {withHeaderAndFooter && <Footer />}
    </div>
  );
}

export default App;
