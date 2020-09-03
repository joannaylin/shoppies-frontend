import React, { useState } from "react";
import MovieCard from "./MovieCard";
import NominationContainer from "./NominationContainer"

const OMDB_URL = "http://www.omdbapi.com/?apikey=937f2766&s=";
const API_URL = "http://localhost:3000/"

export default function Homepage(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieQuery = query.includes(" ") ? query.split(" ").join("+") : query;

    fetch(`${OMDB_URL}${movieQuery}`)
      .then((resp) => resp.json())
      .then((data) => {
        setResults(data.Search);
        setQuery("");
      });
  };

  const renderResults = () => {
    return results.map((movie) => <MovieCard key={movie.imdbID} {...movie} />);
  };

  return (
    <div>
      <h1>Search for a movie to nominate...</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="query" />
        <input type="text" id="query" name={query} value={query} placeholder="Movie Title" onChange={handleChange}></input>
        <input type="submit" />
      </form>
      <div>
        <h2>Results</h2>
        <ul>{renderResults()}</ul>
      </div>
      <NominationContainer/>
    </div>
  );
}
