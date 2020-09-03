import React from "react";

const API_URL = "http://localhost:3000/";

export default function NominationCard(props) {
  const handleRemoveClick = (id, imdbID) => {
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    } 

    fetch(`${API_URL}movies/${id}`, reqObj)
    props.handleRemoveNomination(imdbID)
  };

  return (
    <div>
      <li>
        {props.title} ({props.year_of_release}){" "}
        <button onClick={() => handleRemoveClick(props.id, props.imdb_id)}>Remove</button>
      </li>
    </div>
  );
}
