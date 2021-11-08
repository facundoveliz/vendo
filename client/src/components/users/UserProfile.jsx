import React, { useState, useEffect } from "react";
import { logoutUser } from "./fetchActions";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { getUser, editUser } from "./fetchActions";
import dateFormat from "dateformat";
import Loader from "react-loader-spinner";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("The name is a required field.")
    .min(3, "The name should be at least 3 characters.")
    .max(128, "The name should not have more than 128 characters."),
  email: yup
    .string()
    .email("Email must be a valid email.")
    .required("The email is a required field."),
  password1: yup
    .string()
    .required("The password is a required field.")
    .min(8, "The password should be at least 8 characters.")
    .max(128, "The password not have more than 128 characters."),
  password2: yup
    .string()
    .required("The password confirmation is a required field.")
    .oneOf([yup.ref("password1"), null], "Passwords must match"),
});

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  useEffect(() => {
    getUserRequest();
  }, []);

  // decodes the token and use it to take the id of the current user
  const token = Cookies.get("jwtToken");
  const decoded = jwt_decode(token);

  const getUserRequest = async () => {
    setLoading(true);
    let res = await getUser(decoded._id);
    setUser({
      name: res.name,
      email: res.email,
      date: res.date,
    });
    setLoading(false);
  };

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password1,
    };
    editUser(decoded._id, userData).then((res) => {
      window.location.reload();
      getUserRequest();
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onBlur",
  });

  return (
    <div className="profile">
      <form onSubmit={handleSubmit(onSubmit)} className="profile-container">
        <h1>My Profile</h1>
        {loading ? (
          <Loader
            type="Oval"
            color="#627884"
            height={200}
            width={200}
            className="loading"
          />
        ) : (
          <div className="profile-data-container">
            <div className="profile-data">
              <p className="profile-title">Name</p>
              <input
                name="name"
                placeholder={user.name}
                className={errors.name ? "error" : ""}
                {...register("name")}
              />
              <p className="input-validation">{errors.name?.message}</p>
            </div>

            <div className="profile-data">
              <p className="profile-title">Email</p>
              <input
                name="email"
                placeholder={user.email}
                className={errors.email ? "error" : ""}
                {...register("email")}
              />
              <p className="input-validation">{errors.email?.message}</p>
            </div>

            <div className="profile-data">
              <p className="profile-title">Password</p>
              <input
                placeholder="New password"
                name="password1"
                type="password"
                className={errors.password1 ? "error" : ""}
                {...register("password1")}
              />
              <p className="input-validation">{errors.password1?.message}</p>

              <input
                placeholder="Confirm password"
                name="password2"
                type="password"
                className={errors.password2 ? "error" : ""}
                {...register("password2")}
              />
              <p className="input-validation">{errors.password2?.message}</p>
            </div>

            <div className="profile-data">
              <p>Date created</p>
              <p>{dateFormat(user.date, "dddd, mmmm dS, yyyy")}</p>
            </div>
            <div className="profile-buttons">
              <button type="submit">Save</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
