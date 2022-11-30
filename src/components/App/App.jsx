import { Routes, Route } from 'react-router-dom';
import { Main, Movies, SavedMovies, Profile, Register, Login, Header, Footer } from '../';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={'/'} exact element={<Main />} />
        <Route path={'/movies'} exact element={<Movies />} />
        <Route path={'/saved-movies'} exact element={<SavedMovies />} />
        <Route path={'/profile'} exact element={<Profile />} />
        <Route path={'/signup'} exact element={<Register />} />
        <Route path={'/signin'} exact element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
