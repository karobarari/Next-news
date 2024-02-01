"use client"
import React, { useEffect, useState } from "react";
import { User, UserContextType } from "../types/types";
import { getUsers } from "./getUsers";
import { useRouter } from "next/navigation";
export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
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
    validUsers.map((validUser: User) => {
      if (validUser?.username === loginUsername) {
        setUser(validUser);
        localStorage.setItem("user", JSON.stringify(validUser));

        router.push("/articles");
      }
    });
  }, [loginUsername]);
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
