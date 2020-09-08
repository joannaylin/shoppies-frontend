import React from "react";
import MovieCard from "./MovieCard.js"

export default function MovieContainer(props) {
  const renderResults = () => {
    const nominations = props.nominated.map((nom) => nom.imdb_id);
    return props.results.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        handleNomination={props.handleNomination}
        setError={props.setError}
        isNominated={nominations.includes(movie.imdbID)}
        {...movie}
      />
    ));
  };

  return (
    <div>
      <h1>Results</h1>
      <ol>{renderResults()}</ol>
    </div>
  );
}
