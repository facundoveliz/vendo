import React from "react";
import { editUser } from "../users/fetchActions";
import { deleteUser } from "../users/fetchActions";

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
});

export const Edit = ({ setOpenEdit, selectedEdit, getRequest }) => {
  const onSubmit = (data) => {
    editUser(selectedEdit._id, data);

    // closes the window and get the request for the updated list
    getRequest();
    setOpenEdit(false);
  };

  // validation with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onBlur",
    defaultValues: {
      name: selectedEdit.name,
      email: selectedEdit.email,
    },
  });

  return (
    <div className="input-container">
      <div className="input">
        <div className="input-title">
          <h1>Edit User</h1>
          <button onClick={() => setOpenEdit(false)}>Close</button>
        </div>
        <div className="input-input">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="name"
              className={errors.name ? "error" : ""}
              {...register("name")}
            />
            <p className="input-validation">{errors.name?.message}</p>

            <input
              name="email"
              className={errors.email ? "error" : ""}
              {...register("email")}
            />
            <p className="input-validation">{errors.email?.message}</p>

            <div className="input-button">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Delete = ({ setOpenDelete, selectedDelete, getRequest }) => {
  const handleDelete = (id) => {
    deleteUser(id);

    // closes the window and get the request for the updated list
    getRequest();
    setOpenDelete(false);
  };

  return (
    <div className="delete-container">
      <div className="delete">
        <div className="delete-title">
          <h1>Delete User</h1>
        </div>
        <div className="delete-text">
          <p>Are you sure you want to delete this user?</p>
        </div>
        <div className="delete-button">
          <button onClick={() => handleDelete(selectedDelete)}>Yes</button>
          <button onClick={() => setOpenDelete(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
