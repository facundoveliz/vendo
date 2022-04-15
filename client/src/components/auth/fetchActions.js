import setAuthToken from "../../utils/setAuthToken";
import Cookies from "js-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const registerUser = async (userData, history, setError) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/api/users/register`, userData)
    // if the user register successfully, it redirects it to login page
    .then((res) => history.push("/login"))
    .catch((err) => {
      setError(err);
    });
};

export const loginUser = async (userData, history, setError) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/api/users/login`, userData)
    .then((res) => {
      // save token to local storage
      const { token } = res.data;

      // send it to the header
      setAuthToken(token);

      // if the user registered successfully, it redirects it to main page
      history.push("/");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      setError(true);
    });
};

export const logoutUser = () => {
  // removes the token from local storage
  Cookies.remove("jwtToken");

  // removes the token from header
  setAuthToken(false);
  window.location.reload();
};

// this function is for checking if user is loged to make private routes, the comprobation is also done in the back-end
export const isLogged = () => {
  if (Cookies.get("jwtToken")) {
    return true;
  } else {
    return false;
  }
};

// this function is for checking if user is admin to access admin routes, the comprobation is also done in the back-end
export const isAdmin = () => {
  if (Cookies.get("jwtToken")) {
    const token = Cookies.get("jwtToken");
    const decoded = jwt_decode(token);
    if (decoded.isAdmin) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
