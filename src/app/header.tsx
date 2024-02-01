"use client";
import { get } from "http";
import React, { use, useContext, useEffect } from "react";
import { getUsers } from "./hooks/getUsers";
import { UserContext } from "./hooks/setUser";
import { UserContextType } from "./types/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function Header() {
  const currentDateTime = new Date();
  const formattedDate = format(currentDateTime, "yyyy-MM-dd HH:mm");

  const router = useRouter();
  const { user, logout } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
      } catch (error) {}
    };
  });
  const handleBackToLogin = () => {
    logout();
    router.push("/");
  };
  return (
    <>
      <div className="flex flex-col bg-gradient-to-r from-blue-100 via-red-100 to-yellow-100 rounded-md w-full">
        <h1 className="flex justify-center ">
          <span className="basis-1/4 justify-center shadow-md text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            NC News
          </span>
        </h1>
        <div className="p-5 flex justify-center">
          {user ? (
            <>
              <p className="bg-[#fffcdfbe] font-sm rounded-lg text-xs p-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                <img
                  className="max-h-8 rounded-full"
                  src={user.avatar_url}
                  alt="user avatar"
                />
                Logged in as: {user.username}
              </p>
              <div className="flex flex-row justify-centr">
                <p className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group border">
                  Today's Date: {formattedDate}
                </p>
                <button
                  className="flex justify-center items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xs px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={handleBackToLogin}
                >
                  Back to Login
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
