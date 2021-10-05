import setAuthToken from "../../utils/setAuthToken";
import Cookies from "js-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const getUser = async (id) => {
  let res = await axios
    .get(`/api/users/${id}`)
    .catch((err) => console.log(err));
  return res.data;
};

export const getUsers = async () => {
  let res = await axios.get(`/api/users/`).catch((err) => console.log(err));
  return res.data;
};

export const registerUser = async (userData, history) => {
  await axios
    .post(`/api/users/register`, userData)
    // if the user register successfully, it redirects it to login page
    .then((res) => history.push("/login"))
    .catch((err) => {
      console.log(err);
    });
};

export const loginUser = async (userData, history) => {
  await axios
    .post(`/api/users/login`, userData)
    .then((res) => {
      // save token to local storage
      const { token } = res.data;

      // send it to the header
      setAuthToken(token);

      // if the user registered successfully, it redirects it to main page
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUser = async (id, userData) => {
  await axios.put(`/api/users/edit/${id}`, userData).catch((err) => {
    console.log(err);
  });
};

export const deleteUser = async (id) => {
  await axios
    .delete(`/api/users/delete/${id}`)
    .catch((err) => console.log(err));
};

export const logoutUser = () => {
  // removes the token from local storage
  Cookies.remove("jwtToken");

  // removes the token from header
  setAuthToken(false);
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
  const token = Cookies.get("jwtToken");
  const decoded = jwt_decode(token);
  if (decoded.isAdmin) {
    return true;
  } else {
    return false;
  }
};
