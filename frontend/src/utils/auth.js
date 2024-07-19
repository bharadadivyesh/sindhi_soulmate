import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


export const getAuthToken = () => {
  const token = Cookies.get("auth-token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }
  return null;
};
