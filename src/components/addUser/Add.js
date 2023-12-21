import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Add.css";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const users = {
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    phoneNr: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate("");

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: name === "phone" ? parseInt(value, 10) : value,
    });
  };
  // console.log(user);
  // console.log(name);
  // console.log(value);

  const submitForm = async (e) => {
    e.preventDefault();
    // console.log("ok");
    // console.log(user);
    await axios
      .post("http://localhost:5000/create", user)
      .then((response) => {
        // console.log(response);
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="add">
        <Link to={"/"}>Back</Link>
        <h3>Add new user</h3>
        <form className="formStyle" onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Enter Your name"
              required
              onChange={handleForm}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Your Email"
              required
              onChange={handleForm}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              id="psw"
              name="password"
              autoComplete="off"
              placeholder="Enter your Password"
              required
              onChange={handleForm}
            />
          </div>
          <div className="form-group">
            <label for="birthday">Birthday:</label>
            <input
              type="date"
              id="birthday"
              name="dateOfBirth"
              placeholder="01/09/2020"
              onChange={handleForm}
            ></input>
          </div>
          <div className="form-group gender">
            <label htmlFor="name">Gender</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleForm}
              checked={user.gender === "male"}
            />
            <label htmlFor="name">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleForm}
              checked={user.gender === "female"}
            />
            <label htmlFor="name">Female</label>
          </div>

          <div className="form-group">
            <label htmlFor="number">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phoneNr"
              required
              onChange={handleForm}
            />
          </div>
          <div className="form-group">
            <button type="submit">Add User</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
