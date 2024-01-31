import axios, { AxiosResponse } from "axios";

export const getUsers = () => {
  return axios
    .get(`https://ncnews-yzwd.onrender.com/api/users`)
    .then((res: AxiosResponse) => {
        console.log(res)
      return res.data.users;
    })
    .catch((err) => {
      console.log(err);
    });
};
getUsers()