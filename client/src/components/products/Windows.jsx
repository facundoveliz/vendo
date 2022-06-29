import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { postProduct, putProduct, deleteProduct } from '../../api/products';

// TODO: match this with the backend and all the other ones
const schema = yup.object().shape({
  name: yup
    .string()
    .required('The name is a required field.')
    .min(3, 'The name should be at least 3 characters.')
    .max(128, 'The name should not have more than 128 characters.'),
  price: yup
    .number()
    .required('The price is a required field.')
    .min(1, 'The price should be at least 1 characters.'),
  description: yup
    .string()
    .required('The description is a required field.')
    .min(3, 'The description should be at least 3 characters.'),
});

export function Add({ setOpenNew, getProductsRequest }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);
    formData.append('description', data.description);

    toast.promise(
      postProduct(formData).then(() => {
        // closes the window and get the request for the updated list
        setOpenNew(false);
        getProductsRequest();
      }),
      {
        loading: 'Loading',
        success: () => 'Product created',
        error: () => 'An error ocurred',
      },
    );
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-title">
          <h1>Add product</h1>
          <button type="button" onClick={() => setOpenNew(false)}>
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input
            name="name"
            placeholder="Name"
            className={errors.name?.message ? 'modal-input-error' : ''}
            {...register('name')}
          />
          <p className="modal-p-error">{errors.name?.message}</p>

          <input
            type="number"
            name="price"
            placeholder="Price"
            className={errors.price?.message ? 'modal-input-error' : ''}
            {...register('price')}
          />
          <p className="modal-p-error">{errors.price?.message}</p>

          <input name="image" type="file" {...register('image')} />

          <input
            name="description"
            placeholder="Description"
            className={errors.description?.message ? 'modal-input-error' : ''}
            {...register('description')}
          />
          <p className="modal-p-error">{errors.description?.message}</p>

          <div className="modal-button">
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Edit({ setOpenEdit, selectedEdit, getProductsRequest }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
    defaultValues: {
      name: selectedEdit.name,
      price: selectedEdit.price,
      description: selectedEdit.description,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);
    formData.append('description', data.description);

    toast.promise(
      putProduct(selectedEdit._id, formData).then(() => {
        // closes the window and get the request for the updated list
        getProductsRequest();
        setOpenEdit(false);
      }),
      {
        loading: 'Loading',
        success: () => 'Product updated',
        error: () => 'An error ocurred',
      },
    );
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-title">
          <h1>Edit Product</h1>
          <button type="button" onClick={() => setOpenEdit(false)}>
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input
            name="name"
            placeholder="Name"
            className={errors.name?.message ? 'input-error' : ''}
            {...register('name')}
          />
          <p className="modal-p-error">{errors.name?.message}</p>

          <input
            type="number"
            name="price"
            placeholder="Price"
            className={errors.price?.message ? 'input-error' : ''}
            {...register('price')}
          />
          <p className="modal-p-error">{errors.price?.message}</p>

          <input name="image" type="file" {...register('image')} />

          <input
            name="description"
            placeholder="Description"
            className={errors.description?.message ? 'input-error' : ''}
            {...register('description')}
          />
          <p className="modal-p-error">{errors.description?.message}</p>

          <div className="modal-button">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Delete({ setOpenDelete, selectedDelete, getProductsRequest }) {
  const handleDelete = (id) => {
    toast.promise(
      deleteProduct(id).then(() => {
        // closes the window and get the request for the updated list
        setOpenDelete(false);
        getProductsRequest();
      }),
      {
        loading: 'Loading',
        success: () => 'Product deleted',
        error: () => 'An error ocurred',
      },
    );
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-title">
          <h1>Delete Product</h1>
        </div>
        <div />
        <div className="modal-buttons">
          <button type="submit" onClick={() => handleDelete(selectedDelete)}>
            Yes
          </button>
          <button type="button" onClick={() => setOpenDelete(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
