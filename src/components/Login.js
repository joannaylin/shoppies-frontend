import React, { useState} from "react";
import "./Login.css"

// const API_URL = "http://localhost:3000/"
const API_URL = "https://stormy-everglades-06062.herokuapp.com/"


export default function Login(props) {
  const [username, setUsername] = useState("")

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const formObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({username})
    }

    fetch(`${API_URL}users`, formObj)
      .then(resp => resp.json())
      .then(data => {
        props.history.push(`/${username}`)
        localStorage.setItem("username", data.username)
      })

    setUsername("")
  }

  return (
    <div className="login">
      <h1 className="login-h1">Welcome to the   <span className="login-span">SHOPPIES</span></h1>
      <h2 className="login-h2"><i>Vote for your top 5 favorite movies</i></h2>
      <br/>
      <br/>
      <form onSubmit={handleSubmit}>
        <input className="login-text-input"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        ></input>
        <input className="login-btn" type="submit" value="Login"/>
      </form>
    </div>
  );
}
