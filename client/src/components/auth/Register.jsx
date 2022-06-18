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
    setError,
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
    registerUser(userData, history).then((res) => {
      console.log(res);
      if (res.toString() === 'Invalid email or password') {
        setError('email', {
          message: 'Email already in use',
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
    <div className="register">
      <h1>Vendo.</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          placeholder="Name"
          className={errors.name ? 'error' : ''}
          {...register('name')}
        />
        <p className="input-validation">{errors.name?.message}</p>

        <input
          name="email"
          placeholder="Email"
          className={errors.email ? 'error' : ''}
          {...register('email')}
        />
        <p className="input-validation">{errors.email?.message}</p>

        <input
          name="password1"
          placeholder="Password"
          type="password"
          className={errors.password1 ? 'error' : ''}
          {...register('password1')}
        />
        <p className="input-validation">{errors.password1?.message}</p>

        <input
          name="password2"
          placeholder="Confirm Password"
          type="password"
          className={errors.password2 ? 'error' : ''}
          {...register('password2')}
        />
        <p className="input-validation">{errors.password2?.message}</p>

        <button type="submit" className="button-primary">
          Sign up
        </button>
      </form>

      <div className="auth-redirect">
        <Link to="/login">
          <p>I already have an account</p>
        </Link>
      </div>
    </div>
  );
}

export default Register;
