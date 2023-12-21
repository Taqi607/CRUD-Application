import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/getAll");
      setUsers(response.data);
    };
    fetchData();
  }, []);
  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:5000/delete/${userId}`)
      .then((res) => {
        setUsers((prevUSer) => prevUSer.filter((user) => user._id !== userId));
        console.log(res);
        toast.success(res.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="user-table">
        <Link to={"/add"} className="btn-add">
          Add user
        </Link>
        <table border={1} cellPadding={1} cellSpacing={0}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Gender</th>
              <th>dateOfBirth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNr}</td>
                  <td>{user.gender}</td>
                  <td>{user.dateOfBirth}</td>
                  <td className="Action-btn">
                    <button onClick={() => deleteUser(user._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/edit/` + user._id}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
