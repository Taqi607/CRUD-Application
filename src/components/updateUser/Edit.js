import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../addUser/Add.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
  const users = {
    name: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    phoneNr: "",
  };
  const { id } = useParams();
  const [user, setUser] = useState(users);
  const navigate = useNavigate("");

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: name === "phone" ? parseInt(value, 10) : value,
    });
  };
  console.log(user);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getOne/${id}`)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/update/${id}`, user)
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
        <h3> Update user</h3>

        <form className="formStyle" onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              autoComplete="off"
              placeholder="Enter Your name"
              required
              onChange={inputHandle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              autoComplete="off"
              placeholder="Enter Your Email"
              required
              onChange={inputHandle}
            />
          </div>
          <div className="form-group">
            <label for="birthday">Birthday:</label>
            <input
              type="date"
              id="birthday"
              name="dateOfBirth"
              value={user.dateOfBirth}
              placeholder="01/09/2020"
              onChange={inputHandle}
            ></input>
          </div>
          <div className="form-group gender">
            <label htmlFor="name">Gender</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={inputHandle}
              checked={user.gender === "male"}
            />
            <label htmlFor="name">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={inputHandle}
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
              value={user.phoneNr}
              required
              onChange={inputHandle}
            />
          </div>
          <div className="form-group">
            <button type="submit"> Update User</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
