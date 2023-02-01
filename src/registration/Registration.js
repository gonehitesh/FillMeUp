import React, { useState } from "react";
import "./registration.scss";
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
  });

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
    <form onSubmit={handleSubmit} className="registration-form">
      <h2 className="form-title">Registration Form</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
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
        <label htmlFor="phonenumber">Phone Number:</label>
        <input
          type="phonenumber"
          name="phonenumber"
          value={formData.phonenumber}
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
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
