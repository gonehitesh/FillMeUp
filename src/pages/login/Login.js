import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import './login.scss';
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState({});

  const clientId =
    "329608136140-3jihk7s8b7t492c5tabklrfq1q03tjno.apps.googleusercontent.com";

    const onSuccess =(res)=>{
        console.log("login success", res)
    }
    const onFailure =(res)=>{
        console.log("failed login", res)
    }

    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };

    const handleRoute = (event)=>{
      setUserData(event[0])
      if(event[0].role === "admin"){
        history('/modifyItems', {state: {user: event[0] }});
      }else if(event[0].role === "user"){
        history('/', {state: {user: event[0] }});
      }
    }

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
      fetch(apiPath, fetchData).then(data => data.json())
      .then(success => handleRoute(success));
      // send form data to API or store it in the state
    };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>
      <div className="signInButton">
        <GoogleLogin
          clientId={clientId}
          buttonText="Google Signin"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </div>

    </div>
  );
}
