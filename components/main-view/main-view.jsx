//importing modules from other files//
import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  //movies is initialized to nothing, but then populated below//
  const [movies, setMovies] = useState([]);

  //useEffect is used to run side effects during the course of a components lifecycle//
  useEffect(() => {
    fetch('https://movie-findr.herokuapp.com/movies')
      .then((res) => res.json())
      .then((data) => {
        const dataMovies = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            directorBio: movie.Director.Bio,
            genre: movie.Genre.Name,
            genreDescription: movie.Genre.Description,
            description: movie.Description,
            imageUrl: movie.ImageUrl,
          };
        });
        //console log for debugging//
        console.log(dataMovies);
        //populates our state using the function we declared when initializing the state above//
        setMovies(dataMovies);
      });
    //since we haven't set any dependencies in the array, we will only fetch upon mounting//
  }, []);
  //if we click on a movie//
  if (selectedMovie) {
    return (
      <MovieView
        //passes our selected movie as a prop to MovieView//
        movie={selectedMovie}
        //passes our onBackClick function as a prop to MovieView//
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>'The movie list is empty'</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          //deconstructs movie so that it is easily accessible as a prop//
          movie={movie}
          //passes our onMovieClick function as a prop to MovieCard//
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};