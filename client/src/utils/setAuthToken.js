import Cookies from "js-cookie";

const setAuthToken = (token) => {
  if (token) {
    Cookies.set("jwtToken", token);
  } else {
    Cookies.remove("jwtToken");
  }
};

export default setAuthToken;
