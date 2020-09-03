import React from "react";
import NominationCard from "./NominationCard"

export default function NominationContainer(props) {
  const renderNominations = () => {
    return props.movies.map(movie => {
      return <NominationCard key={movie.imdb_id} handleRemoveNomination={props.handleRemoveNomination} {...movie} />
    })
  }

  return (
    <div>
      <h1>Your Nominations</h1>
      {props.movies.length === 5 ? <h3>You have nominated 5 movies for the Shoppies!</h3> : null}
      <ul>{renderNominations()}</ul>
    </div>
  );
}
