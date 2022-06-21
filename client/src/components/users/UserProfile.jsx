import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { logoutUser } from '../../api/auth';
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
  // const [loading, setLoading] = useState(false);
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
    <div>
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="name">
              Name
              <input
                name="name"
                id="name"
                {...register('name')}
              />
            </label>
            <p>{errors.name?.message}</p>
          </div>

          <div>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                {...register('email')}
              />
            </label>
            <p>{errors.email?.message}</p>
          </div>

          <div>
            <label htmlFor="email">
              Password
              <input
                id="password"
                name="password"
                placeholder="New password"
                type="password"
                {...register('password')}
              />
            </label>
            <p>{errors.password?.message}</p>

            <input
              id="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              type="password"
              {...register('passwordConfirm')}
            />
            <p>
              {errors.passwordConfirm?.message}
            </p>
          </div>

          <div>
            <button type="button" onClick={() => handleDelete()}>
              Delete account
            </button>
            <button type="button" onClick={() => logoutUser()}>
              Logout
            </button>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
