import jwt from 'jwt-decode';
import axiosClient from './axiosClient';

const url = `${process.env.REACT_APP_API_URL}/api/users`;

export async function registerUser(userData) {
  await axiosClient.post(`${url}/register`, userData).then(() => {
    window.location.href = '/login';
  });
}

export async function loginUser(userData) {
  await axiosClient.post(`${url}/login`, userData).then((res) => {
    localStorage.setItem('x-auth-token', res.data.result);
    window.location.href = '/';
  });
}

export const logoutUser = () => {
  // removes the token from local storage
  localStorage.removeItem('x-auth-token');
  window.location.href = '/login';
};

// this function is for checking if user is loged to
// make private routes, the comprobation is also done
// in the back-end
export const isLogged = () => {
  const token = localStorage.getItem('x-auth-token');
  if (token) {
    return true;
  }
  return false;
};

// this function is for checking if user is admin to
// access admin routes, the comprobation is also done
// in the back-end
export const isAdmin = () => {
  const token = localStorage.getItem('x-auth-token');
  if (token) {
    const decoded = jwt(token);
    if (decoded.isAdmin) {
      return true;
    }
    return false;
  }
  return false;
};
