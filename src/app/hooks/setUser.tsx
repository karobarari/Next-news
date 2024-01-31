import { useEffect, useState } from "react";
import { User } from "../types/types";

export const UserProvider = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          avatar_url: "",
          name: "",
          username: "",
        };
  });
  const [loginUsername, setLoginUsername] = useState<String>("");
  const [validUsers, setValidUsers] = useState([]);

  const login = (username: String) => {
    setLoginUsername(username);
  };
  useEffect(() => {
    getUsers().then((res) => {
      setValidUsers(res);
    });
    validUsers.map((validUser) => {
      if (validUser.username === loginUsername) {
        setUser(validUser);
        localStorage.setItem("user", JSON.stringify(validUser));

        navigate("/articles");
      }
    });
  }, [loginUsername]);
};
