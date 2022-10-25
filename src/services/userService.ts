import axios from "axios";
import { User } from "../interfaces/User";
import jwt_decode from "jwt-decode";
const api: string = process.env.REACT_APP_API || "";

export const userLogin = (user: User): Promise<any> =>
  axios.post(`${api}login`, user);

export const registerUser = (newUser: User): Promise<any> =>
  axios.post(`${api}register`, newUser);

export const getIsBiz = () => {
  return (jwt_decode(sessionStorage.getItem("token") as string) as any).biz;
};

export const getUser = (): Promise<any> =>
  axios.get(`${api}profile`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });

export const editUser = (user: User): Promise<any> =>
  axios.put(`${api}profile`, user, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
