import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "./fetchActions";
import Cookies from "js-cookie";

const Login = () => {
  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, []);
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("johndoepassword");
  const [error, setError] = useState(false);

  const history = useHistory();

  const token = Cookies.get("jwtToken");

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
        <input
          onChange={(e) => setEmail(e.target.value)}
          defaultValue="johndoe@gmail.com"
          placeholder="Email"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          defaultValue="johndoepassword"
          placeholder="Password"
        />

        {error ? (
          <p className="input-error">Invalid email or password</p>
        ) : null}

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

      {/* <p className="or">OR</p>

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
      </div> */}
    </div>
  );
};

export default Login;
