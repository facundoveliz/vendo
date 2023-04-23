import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { loginUser } from '../../api/auth';

const schema = yup
  .object({
    email: yup
      .string()
      .required('The email is a required field.')
      .email('Email must be a valid email.'),
    password: yup
      .string()
      .required('The password is a required field.')
      .min(8, 'The password should be at least 8 characters.')
      .max(128, 'The password should not have more than 128 characters.'),
  })
  .required();

function Login() {
  const history = useHistory();
  const token = localStorage.getItem('x-auth-token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'johndoe@gmail.com',
      password: 'johndoepassword',
    },
  });

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    loginUser(userData);
  };

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, []);

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={errors.email?.message ? 'input-error' : ''}
          name="email"
          placeholder="Email"
          {...register('email')}
        />

        <input
          type="password"
          className={errors.email?.message ? 'input-error' : ''}
          name="password"
          placeholder="Password"
          {...register('password')}
        />
        <p className="p-error">{errors.email?.message}</p>

        <button type="submit">Log in</button>
        <Link to="/register">
          <p className="auth-redirect">Create an account</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
