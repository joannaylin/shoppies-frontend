import React, { useState, useEffect } from "react";
import NominationContainer from "./NominationContainer";
import MovieContainer from "./MovieContainer.js";
import "./Homepage.css";
import { API_URL, OMDB_URL } from "../constants.js";

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [nominated, setNominated] = useState([]);
  const [error, setError] = useState(false);
  const [queryError, setQueryError] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    fetch(`${API_URL}users/${username}`)
      .then((resp) => resp.json())
      .then((data) => {
        setNominated(data.movies);
      });
  }, []);

  const handleNomination = (movie) => {
    setNominated([...nominated, movie]);
  };

  const handleRemoveNomination = (imdbID) => {
    setNominated(nominated.filter((nom) => nom.imdb_id !== imdbID));
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieQuery = query.includes(" ") ? query.split(" ").join("+") : query;

    fetch(`${OMDB_URL}${movieQuery}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Search) {
          setResults(data.Search);
          setQuery("");
        } else {
          setQueryError(true);
        }
      });
  };

  return (
    <div className="homepage">
      <div id="homepage-search-container">
        <h1 className="homepage-h1">Search for a movie to nominate</h1>
        {error ? (
          <p>
            You've already nominated 5 movies! Please remove a movie if you'd
            like to change your nominations.
          </p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <input
            className="homepage-text-input"
            type="text"
            id="query"
            name="query"
            value={query}
            placeholder="Movie Title"
            onChange={handleChange}
          ></input>
          <input className="homepage-btn" type="submit" value="SEARCH" />
        </form>
        <br />
        {queryError ? (
          <p>No movies match your search.. please try again!</p>
        ) : null}
        {results.length > 0 ? (
          <MovieContainer
            results={results}
            setError={setError}
            nominated={nominated}
            handleNomination={handleNomination}
          />
        ) : null}
      </div>
      <NominationContainer
        id="homepage-nomination-container"
        movies={nominated}
        handleRemoveNomination={handleRemoveNomination}
      />
    </div>
  );
}
