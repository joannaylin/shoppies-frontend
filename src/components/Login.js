import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/loading.json";
import "./Login.css";
import { API_URL } from "../constants.js";


export default function Login(props) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username }),
    };

    fetch(`${API_URL}users`, formObj)
      .then((resp) => resp.json())
      .then((data) => {
        props.history.push(`/${username}`);
        localStorage.setItem("username", data.username);
      });

    setUsername("");
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="login">
      <h1 className="login-h1">
        Welcome to the <span className="login-span">SHOPPIES</span>
      </h1>
      <h2 className="login-h2">
        <i>Vote for your top 5 favorite movies</i>
      </h2>
      <br />
      <br />
      {loading ? (
        <Lottie options={defaultOptions} height={200} width={200} />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            className="login-text-input"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
          ></input>
          <input className="login-btn" type="submit" value="Login" />
        </form>
      )}
    </div>
  );
}
