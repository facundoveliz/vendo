import React from "react";
import { addProduct } from "./fetchActions";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("The name is a required field.")
    .min(3, "The name should be at least 3 characters.")
    .max(128, "The name should not have more than 128 characters."),
  price: yup
    .number()
    .typeError("The price is a required field.")
    .positive()
    .integer()
    .required(),
  description: yup
    .string()
    .required("The name is a required field.")
    .min(3, "The description should be at least 3 characters.")
    .max(128, "The description not have more than 3 characters."),
});

const AddProduct = ({ setOpenNew, getProductsRequest }) => {
  const onSubmit = (data) => {
    const formData = new FormData();

    console.log(data.image);

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("image", data.image[0]);
    formData.append("description", data.description);

    addProduct(formData);

    // closes the window and get the request for the updated list
    getProductsRequest();
    setOpenNew(false);
  };

  // validation with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onBlur",
  });

  return (
    <div className="input-container">
      <div className="input">
        <div className="input-title">
          <h1>Add product</h1>
          <button onClick={() => setOpenNew(false)}>Close</button>
        </div>
        <div className="input-input">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <input
              name="name"
              placeholder="Name"
              className={errors.name ? "error" : ""}
              {...register("name")}
            />
            <p className="input-validation">{errors.name?.message}</p>

            <input
              type="number"
              name="price"
              placeholder="Price"
              className={errors.price ? "error" : ""}
              {...register("price")}
            />
            <p className="input-validation">{errors.price?.message}</p>

            <input name="image" type="file" {...register("image")} />

            <input
              name="description"
              placeholder="Description"
              className={errors.description ? "error" : ""}
              {...register("description")}
            />
            <p className="input-validation">{errors.description?.message}</p>

            <button type="submit" className="button-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
