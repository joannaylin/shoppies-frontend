import React, { useState, useEffect } from "react";
import { useClipboard } from "use-clipboard-copy";
import MovieCard from "./MovieCard";
import NominationContainer from "./NominationContainer";

const OMDB_URL = "http://www.omdbapi.com/?apikey=937f2766&s=";
// const API_URL = "http://localhost:3000/";
const API_URL = "https://stormy-everglades-06062.herokuapp.com/"

export default function Homepage() {
  const clipboard = useClipboard();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [nominated, setNominated] = useState([]);
  const [error, setError] = useState(false);

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
    setNominated(nominated.filter(nom => nom.imdb_id !== imdbID))
  }

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
    const nominations = nominated.map((nom) => nom.imdb_id);
    return results.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        handleNomination={handleNomination}
        setError={setError}
        isNominated={nominations.includes(movie.imdbID)}
        {...movie}
      />
    ));
  };

  return (
    <div>
      <h1>Search for a movie to nominate:</h1>
      {error ? (
        <p>You've already nominated 5 movies! Please remove a movie if you'd like to change your nominations.</p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          placeholder="Movie Title"
          onChange={handleChange}
        ></input>
        <input type="submit" />
      </form>
      <div>
        <h2>Results</h2>
        <p>Want to share your nominations? Copy the link and send to a friend!</p>
        <input ref={clipboard.target} value={`http://localhost:3001/users/${localStorage.getItem("username")}`} readOnly />
        <button onClick={clipboard.copy}>Copy</button>
        <ul>{renderResults()}</ul>
      </div>
      <NominationContainer movies={nominated} handleRemoveNomination={handleRemoveNomination}/>
    </div>
  );
}
