import React from "react";
import "./MovieCard.css";

// const API_URL = "http://localhost:3000/";
const API_URL = "https://stormy-everglades-06062.herokuapp.com/";

export default function MovieCard(props) {
  const handleNominateClick = (e) => {
    const movie = {
      title: props.Title,
      year_of_release: props.Year,
      username: localStorage.getItem("username"),
      imdb_id: props.imdbID,
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ movie }),
    };

    fetch(`${API_URL}movies`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          props.setError(true);
        } else {
          props.handleNomination(data);
        }
      });
  };

  return (
    <li className="movie-card-li">
      {props.Title} ({props.Year}){" "}
      <button
        className="movie-card-btn"
        disabled={props.isNominated}
        onClick={handleNominateClick}
      >
        Nominate
      </button>
    </li>
  );
}
