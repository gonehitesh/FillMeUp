import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import './login.scss';

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
  });

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

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Form Data: ", formData);
      let apiPath = "http://localhost:5000/adduser";
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let fetchData = {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          phonenumber: formData.phonenumber,
          name: formData.name,
        }),
        headers: myHeaders,
      };
      return fetch(apiPath, fetchData);
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
