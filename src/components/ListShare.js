import React, { useEffect, useState } from "react";
import "./ListShare.css"
import "../constants.js"
import { API_URL } from "../constants.js";

export default function ListShare(props) {
  const [movies, setMovies] = useState([])
  const [username, setUsername] = useState("")

  useEffect(() => {
    setUsername(props.match.params.username)
    fetch(`${API_URL}users/${username}`)
    .then(resp=> resp.json())
    .then(data => {
      setMovies([...data.movies])
      })
  },[props.match.params.username, username])

  const renderList = () => {
    return movies.map(movie => <li key={movie.id}>{movie.title} ({movie.year_of_release})</li>)
  }

  return (
    <div className="list-share">
      <h1>{`${username}'s Nomination List`}</h1>
      <ol>
        {movies.length > 0 ? renderList() : <p>No movies have been nominated yet!</p>}
      </ol>
    </div>
  );
}
