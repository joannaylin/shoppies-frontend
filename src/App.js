import React, { useState } from "react";
import "./App.css";

const API_URL = "http://www.omdbapi.com/?apikey=937f2766&s=";

function App() {
  const [movie, setMovie] = useState("");
  const [results, setResults] = useState([])

  const handleChange = (e) => {
    setMovie(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${API_URL}${movie}`)
      .then((resp) => resp.json())
      .then((data) => setResults(data.Search));
  };

  return (
    <div>
      <h1>Search for a movie to nominate...</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={movie} onChange={handleChange}></input>
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
