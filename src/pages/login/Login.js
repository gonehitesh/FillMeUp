import React, { useEffect, useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Button } from "antd";

export default function Login() {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [userData, setUserData] = useState({});

  const clientId =
    "329608136140-3jihk7s8b7t492c5tabklrfq1q03tjno.apps.googleusercontent.com";

  const handleResponse = (response) => {
    const details = jwtDecode(response?.credential);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRoute = (event) => {
    // setUserData(event[0]);
    if (event[0].role === "admin") {
      history("/modifyItems", { state: { user: event[0] } });
    } else if (event[0].role === "user") {
      history("/", { state: { user: event[0] } });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let apiPath = "http://localhost:5000/validateuser";
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let fetchData = {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      headers: myHeaders,
    };
    fetch(apiPath, fetchData)
      .then((data) => data.json())
      .then((success) => handleRoute(success));
    // send form data to API or store it in the state
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInButton"), {
      theme: "filled_blue",
      size: "large",
      shape: "circle",
    });
  }, []);

  return (
    <div>
      <form className="login-form">
        <h2 className="form-title">Log In</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <Button type="primary" size="large" block onClick={handleSubmit}>
          Log in
        </Button>
        <p className="centeredText">or</p>
        <div id="signInButton"></div>
        <p className="centeredText">
          Create Account <a href="/signup">here</a>
        </p>
      </form>
    </div>
  );
}
