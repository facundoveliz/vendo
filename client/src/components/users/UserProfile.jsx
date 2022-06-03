import React, { useState, useEffect } from "react";

import { deleteUser, getUser, putUser } from "../../api/users";
import { logoutUser } from "../../api/auth";

import Loader from "react-loader-spinner";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup
    .string()
    .min(3, "The name should be at least 3 characters.")
    .max(128, "The name should not have more than 128 characters."),
  email: yup
    .string()
    .min(1, "The email is a required field")
    .email("Email must be a valid email.")
    .required(),
  password: yup
    .string()
    .notRequired()
    .matches(/.{8,}/, {
      excludeEmptyString: true,
      message: "The password should be at least 8 characters.",
    })
    .max(128, "The password should not have more than 128 characters."),
  passwordConfirm: yup
    .string()
    .notRequired()
    .matches(/.{8,}/, {
      excludeEmptyString: true,
      message: "The password should be at least 8 characters.",
    })
    .max(128, "The password should not have more than 128 characters.")
    .oneOf([yup.ref("password"), null], "Passwords must match."),
});

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    toast.promise(
      putUser(data).then((res) => {
        getUserRequest();
      }),
      {
        loading: "Loading",
        success: (res) => `Profile updated`,
        error: (err) => `An error ocurred`,
      }
    );
  };

  const getUserRequest = async () => {
    setLoading(true);
    const res = await getUser();
    reset({
      name: res.name,
      email: res.email,
      password: "",
      passwordConfirm: "",
    });
    if (res) {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    toast.promise(
      deleteUser().then(() => {
        localStorage.removeItem("x-auth-token");
        window.location.href = "/login";
      }),
      {
        loading: "Loading",
        success: (res) => `Profile deleted`,
        error: (err) => `An error ocurred`,
      }
    );
  };

  useEffect(() => {
    getUserRequest();
  }, []);

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
              <label className="profile-title">Name</label>
              <input
                name="name"
                className={errors.name ? "error" : ""}
                {...register("name")}
              />
              <p className="input-validation">{errors.name?.message}</p>
            </div>

            <div className="profile-data">
              <label className="profile-title">Email</label>
              <input
                name="email"
                className={errors.email ? "error" : ""}
                {...register("email")}
              />
              <p className="input-validation">{errors.email?.message}</p>
            </div>

            <div className="profile-data">
              <label className="profile-title">Password</label>
              <input
                placeholder="New password"
                name="password"
                type="password"
                className={errors.password ? "error" : ""}
                {...register("password")}
              />
              <p className="input-validation">{errors.password?.message}</p>

              <input
                placeholder="Confirm password"
                name="passwordConfirm"
                type="password"
                className={errors.passwordConfirm ? "error" : ""}
                {...register("passwordConfirm")}
              />
              <p className="input-validation">
                {errors.passwordConfirm?.message}
              </p>
            </div>

            <div className="profile-buttons">
              <button type="button" onClick={() => handleDelete()}>
                Delete account
              </button>
              <button type="button" onClick={() => logoutUser()}>
                Logout
              </button>
              <button type="submit">Save</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
