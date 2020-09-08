import React from "react";
import NominationCard from "./NominationCard";
import { useClipboard } from "use-clipboard-copy";
import "./NominationContainer.css";

export default function NominationContainer(props) {
  const clipboard = useClipboard();

  const renderNominations = () => {
    return props.movies.map((movie) => {
      return (
        <NominationCard
          key={movie.imdb_id}
          handleRemoveNomination={props.handleRemoveNomination}
          {...movie}
        />
      );
    });
  };

  return (
    <div className="nomination-container">
      <h1>Your Nominations</h1>
      {props.movies.length === 5 ? (
        <h3>You have nominated 5 movies for the Shoppies!</h3>
      ) : null}
      <p>
        <i>Share your nominations with your friends using the link below.</i>
      </p>
      <input
        className="nomination-container-share"
        ref={clipboard.target}
        value={`https://cocky-pasteur-9a4460.netlify.app/users/${localStorage.getItem(
          "username"
        )}`}
        readOnly
      />
      <button
        className="nomination-container-copy-btn"
        onClick={clipboard.copy}
      >
        COPY
      </button>
      <ol className="nomination-container-list">{renderNominations()}</ol>
    </div>
  );
}
