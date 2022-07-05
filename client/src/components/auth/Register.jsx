import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../../api/auth';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('The name is a required field.')
    .min(3, 'The name should be at least 3 characters.')
    .max(128, 'The name should not have more than 128 characters.'),
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('The email is a required field.'),
  password1: yup
    .string()
    .required('The password is a required field.')
    .min(8, 'The password should be at least 8 characters.')
    .max(128, 'The password not have more than 128 characters.'),
  password2: yup
    .string()
    .required('The password confirmation is a required field.')
    .oneOf([yup.ref('password1'), null], 'Passwords must match'),
});

function Register() {
  const token = localStorage.getItem('x-auth-token');

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password1,
    };
    registerUser(userData);
  };

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, []);

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          placeholder="Name"
          className={errors.name?.message ? 'input-error' : ''}
          {...register('name')}
        />
        <p className="p-error">{errors.name?.message}</p>

        <input
          name="email"
          placeholder="Email"
          className={errors.email?.message ? 'input-error' : ''}
          {...register('email')}
        />
        <p className="p-error">{errors.email?.message}</p>

        <input
          name="password1"
          placeholder="Password"
          className={errors.password1?.message ? 'input-error' : ''}
          type="password"
          {...register('password1')}
        />
        <p className="p-error">{errors.password1?.message}</p>

        <input
          name="password2"
          placeholder="Confirm Password"
          className={errors.password2?.message ? 'input-error' : ''}
          type="password"
          {...register('password2')}
        />
        <p className="p-error">{errors.password2?.message}</p>

        <button type="submit">Sign up</button>
        <Link to="/login">
          <p className="auth-redirect">I already have an account</p>
        </Link>
      </form>
    </div>
  );
}

export default Register;
