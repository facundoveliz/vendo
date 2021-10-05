import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "./fetchActions";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const history = useHistory();

  const userData = {
    email: email,
    password: password,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(userData, history, setError);
  };

  return (
    <div className="login">
      <h1>Vendo.</h1>

      <form onSubmit={onSubmit} className="login-form">
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Pasword"
        />

        {error ? <p className="input-error">{error}</p> : null}

        <button type="submit" className="button-primary">
          Log in
        </button>
      </form>

      <div className="auth-redirect">
        <Link to="/">
          <p>Forgot your password?</p>
          <p className="separator">-</p>
          <Link to="/register">
            <p>Sign up to Vendo</p>
          </Link>
        </Link>
      </div>

      <p className="or">OR</p>

      <div className="auth-redirect">
        <Link to="/register">
          <button className="button-optional">Continue with Facebook</button>
        </Link>
        <Link to="/register">
          <button className="button-optional">Continue with Youtube</button>
        </Link>
        <Link to="/register">
          <button className="button-optional">Continue with Github</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
