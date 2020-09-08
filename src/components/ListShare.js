import React, { useEffect, useState } from "react";
import "./ListShare.css"
import "../constants.js"

const API_URL = "https://stormy-everglades-06062.herokuapp.com/";

export default function ListShare(props) {
  const [movies, setMovies] = useState([])
  const [username, setUsername] = useState("")

  useEffect(() => {
    setUsername(props.match.params.username)
    fetch(`${API_URL}users/${username}`)
    .then(resp=> resp.json())
    .then(data => {
      setMovies(data.movies)
      })
  },[props.match.params.username, username])

  const renderList = () => {
    return movies.map(movie => <li key={movie.id}>{movie.title} ({movie.year_of_release})</li>)
  }

  console.log(props)
  console.log(movies)
  return (
    <div className="list-share">
      <h1>{`${username}'s Nomination List`}</h1>
      <ul>
        {movies > 0 ? renderList() : <p>No movies have been nominated yet!</p>}
      </ul>
    </div>
  );
}
