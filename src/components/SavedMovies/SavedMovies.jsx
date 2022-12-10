import {useState} from 'react'
import { MoviesCardList } from '../';
import fakeSavedMovies from '../../utils/fakeSavedMovies';

function SavedMovies() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className='saved-movies'>
      <div className="saved-movies__container">
        <MoviesCardList isLoading={isLoading} movies={fakeSavedMovies} wasSaved={true}/>
      </div>
    </section>
  )
}

export default SavedMovies