import {useState} from 'react'
import { MoviesCardList } from '../';
import fakeSavedMovies from '../../utils/fakeSavedMovies';

function SavedMovies() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className='saved-movies'>
      <div className="saved-movies__container">
        <MoviesCardList isLoading={isLoading} movies={fakeSavedMovies} wasSaved={true}/>
      </div>
    </main>
  )
}

export default SavedMovies