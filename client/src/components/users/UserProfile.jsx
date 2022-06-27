import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { deleteProfile, getUser, putProfile } from '../../api/users';

const schema = yup.object({
  name: yup
    .string()
    .min(3, 'The name should be at least 3 characters.')
    .max(128, 'The name should not have more than 128 characters.'),
  email: yup
    .string()
    .min(1, 'The email is a required field')
    .email('Email must be a valid email.')
    .required(),
  password: yup
    .string()
    .notRequired()
    .matches(/.{8,}/, {
      excludeEmptyString: true,
      message: 'The password should be at least 8 characters.',
    })
    .max(128, 'The password should not have more than 128 characters.'),
  passwordConfirm: yup
    .string()
    .notRequired()
    .matches(/.{8,}/, {
      excludeEmptyString: true,
      message: 'The password should be at least 8 characters.',
    })
    .max(128, 'The password should not have more than 128 characters.')
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getUserRequest = async () => {
    const res = await getUser();
    reset({
      name: res.name,
      email: res.email,
      password: '',
      passwordConfirm: '',
    });
  };

  // FIX: it does weird stuff with getUserRequest()
  const onSubmit = (data) => {
    putProfile(data).then((res) => {
      if (res.toString() === 'Invalid email or password') {
        setError('email', {
          message: res.toString(),
        });
      }
    });
    getUserRequest();
  };

  const handleDelete = async () => {
    toast.promise(
      deleteProfile().then(() => {
        localStorage.removeItem('x-auth-token');
        window.location.href = '/login';
      }),
      {
        loading: 'Loading',
        success: () => 'Profile deleted',
        error: () => 'An error ocurred',
      },
    );
  };

  useEffect(() => {
    getUserRequest();
  }, []);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className={errors.name?.message ? 'input-error' : ''}
            {...register('name')}
          />
          <p className="p-error">{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className={errors.email?.message ? 'input-error' : ''}
            {...register('email')}
          />
          <p className="p-error">{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="New password"
            type="password"
            className={errors.password?.message ? 'input-error' : ''}
            {...register('password')}
          />
          <p className="p-error">{errors.password?.message}</p>

          <input
            id="password"
            placeholder="Confirm password"
            type="password"
            className={errors.passwordConfirm?.message ? 'input-error' : ''}
            {...register('passwordConfirm')}
          />
          <p className="p-error">{errors.passwordConfirm?.message}</p>
        </div>
        <button type="submit">Update profile</button>
      </form>

      <div className="section profile-delete-account">
        <h2>Delete account</h2>
        <p>
          Once you delete your account there is not going back, so be certain.
        </p>
        <button
          type="button"
          className="button-danger"
          onClick={() => handleDelete()}
        >
          Delete account
        </button>
      </div>
    </div>
  );
}

export default Profile;
