import React from "react";
import "./NominationCard.css"
import { API_URL } from "../constants.js";

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
        <button className="nomination-card-btn" onClick={() => handleRemoveClick(props.id, props.imdb_id)}>Remove</button>
      </li>
    </div>
  );
}
