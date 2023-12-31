import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";

export const http = axios.create({
  baseURL: "https://learnconnectapitest.azurewebsites.net/api",
  withCredentials: false,
});

http.interceptors.request.use(function (req) {
  // const { jwtToken } = UserAuth();

  const token = localStorage.getItem("token");
  // console.log("WTF",token)

  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});
