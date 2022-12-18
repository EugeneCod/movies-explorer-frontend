// import {useState} from 'react'
import { MoviesCardList } from '../';

function SavedMovies() {
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <main className='saved-movies'>
      <div className="saved-movies__container">
        <MoviesCardList 
          // state={moviesListState}
          // onSearchSubmit={handleSearchSubmit}
          // onSearchInput={handleSearchInput}
          // onToggleFilter={handleToggleFilter}
        />
      </div>
    </main>
  )
}

export default SavedMovies