import axiosClient from "./axiosClient";
import jwt_decode from "jwt-decode";

const url = `${process.env.REACT_APP_API_URL}/api/users`;

export async function registerUser(userData) {
  await axiosClient.post(`${url}/register`, userData);
  return (window.location.href = "/login");
}

export async function loginUser(userData) {
  const res = await axiosClient.post(`${url}/login`, userData);
  localStorage.setItem("x-auth-token", res.data.result);
  return (window.location.href = "/");
}

export const logoutUser = () => {
  // removes the token from local storage
  localStorage.removeItem("x-auth-token");
  window.location.href = "/login";
};

// this function is for checking if user is loged to make private routes, the comprobation is also done in the back-end
export const isLogged = () => {
  const token = localStorage.getItem("x-auth-token");
  if (token) {
    return true;
  }
  return false;
};

// this function is for checking if user is admin to access admin routes, the comprobation is also done in the back-end
export const isAdmin = () => {
  const token = localStorage.getItem("x-auth-token");
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.isAdmin) {
      return true;
    }
    return false;
  }
  return false;
};