import React, { useState, useEffect } from "react";
import { logoutUser } from "./fetchActions";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { getUser } from "./fetchActions";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

const handleLogout = () => {
  logoutUser();
  window.location.href = "/login";
};

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getUserRequest(decoded._id);
  }, []);

  // decodes the token and use it to take the id of the current user
  const token = Cookies.get("jwtToken");
  const decoded = jwt_decode(token);

  const getUserRequest = async (id) => {
    let res = await getUser(id);
    setName(res.name);
    setEmail(res.email);
    setAdmin(res.isAdmin);
    setDate(res.created);
  };

  return (
    <div className="profile">
      <form className="profile-container">
        <h1>My Profile</h1>
        <div className="profile-data-container">
          <div className="profile-data">
            <p>Name</p>
            <input value={name}></input>
          </div>

          <div className="profile-data">
            <p>Email</p>
            <input value={email}></input>
          </div>

          <div className="profile-data">
            <p>Password</p>
            <input placeholder="New password" />
            <input placeholder="Confirm password" />
          </div>

          <div className="profile-data">
            <p>Adress</p>
            <input placeholder="Add an adress"></input>
          </div>

          <div className="profile-data">
            <p>Phone Number</p>
            <input placeholder="Add a phone number"></input>
          </div>

          {admin ? (
            <div className="profile-data-admin">
              <p>Admin</p>
              <Link to="/dashboard">
                <button>Dashboard</button>
              </Link>
            </div>
          ) : null}

          <div className="profile-data">
            <p>Date created</p>
            <p>{dateFormat(date, "dddd, mmmm dS, yyyy")}</p>
          </div>
        </div>
        <div className="profile-buttons">
          <button>Save</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
