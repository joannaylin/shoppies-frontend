import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/";

export default function ListShare(props) {
  const [movies, setMovies] = useState([])
  const [username, setUsername] = useState("")

  useEffect(() => {
    fetch(`${API_URL}users/${props.match.params.username}`)
      .then(resp=> resp.json())
      .then(data => {
        setMovies(data.movies)
        setUsername(props.match.params.username)
      })
  },[username])

  const renderList = () => {
    return movies.map(movie => <li key={movie.id}>{movie.title} ({movie.year_of_release})</li>)
  }

  console.log(movies)
  return (
    <div>
      <h1>{`${username}'s Nomination List`}</h1>
      <ul>
        {renderList()}
      </ul>
    </div>
  );
}
