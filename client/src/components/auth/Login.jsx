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
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    loginUser(userData).then((res) => {
      if (res.toString() === 'Invalid email or password') {
        setError('email', {
          message: res.toString(),
        });
      }
    });
  };

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, []);

  return (
    <div className="login">
      <h1>Vendo.</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          defaultValue="johndoe@gmail.com"
          name="email"
          placeholder="Email"
          {...register('email')}
        />
        <p className="input-validation">{errors.email?.message}</p>

        <input
          type="password"
          defaultValue="johndoepassword"
          name="password"
          placeholder="Password"
          {...register('password')}
        />
        <p className="input-validation">{errors.password?.message}</p>

        <button type="submit" className="button-primary">
          Log in
        </button>
      </form>

      <div className="auth-redirect">
        <Link to="/">
          <Link to="/register">
            <p>Sign up to Vendo</p>
          </Link>
        </Link>
      </div>
    </div>
  );
}

export default Login;
