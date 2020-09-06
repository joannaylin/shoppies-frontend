import React, { useState} from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        ></input>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}
