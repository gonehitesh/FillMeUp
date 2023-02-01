import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [name, setName] = useState("");

  console.log("name: ", email, "password: ", password);

  const ValidateUser = () => {
    let apiPath = "http://localhost:5000/adduser";
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let fetchData = {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        phonenumber: phonenumber,
        name: name,
      }),
      headers: myHeaders,
    };
    return fetch(apiPath, fetchData);
  };

  return (
    <div>
      <form id="logform">
        <h2>Login Form</h2>
        <label htmlFor="name">
          Name:
          <input
            type="name"
            id="ulpassword"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="ulemail"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label htmlFor="phonenumber">
          Phonenumber:
          <input
            type="number"
            id="ulpassword"
            name="phonenumber"
            value={phonenumber}
            onChange={(event) => setPhonenumber(event.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="ulpassword"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="button">Clear</button>
        <button type="button" onClick={() => ValidateUser()}>
          Submit
        </button>
      </form>
      {/** <Facebook />*/}
    </div>
  );
}
