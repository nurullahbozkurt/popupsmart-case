import React from "react";
import { Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { SiTodoist } from "react-icons/si";
import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

import { useApp } from "../states/app";
import useGetTodos from "../hooks/useGetTodos";

const Header = () => {
  const { data } = useGetTodos();

  const { localUsername, setLocalUsername, darkMode, setDarkMode } = useApp();

  // This state is show the number of todos.
  const [compledetTodoCount, setCompledetTodoCount] = useState({
    totalCount: 0,
    completedCount: 0,
  });

  const logOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("darkMode");
    setLocalUsername(null);
    setDarkMode(false);
  };

  // Turn dark mode on and off
  const switchDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };

  // It is used to show the number of todos in the header.
  useEffect(() => {
    const completedTodo = data?.filter((todo) => todo.isCompleted === true);
    setCompledetTodoCount({
      ...compledetTodoCount,
      completedCount: completedTodo?.length,
      totalCount: data?.length,
    });
  }, [data]);

  return (
    <>
      <div className="w-full dark:bg-slate-900 dark:border-b flex items-center justify-between bg-primaryBlue p-2 px-4 text-white text-lg">
        <Link
          to="/app"
          className="flex items-center gap-2 bg-yellow-500 px-4 rounded font-poiret"
        >
          <div className="text-primaryBlue">
            <SiTodoist />
          </div>
          <h1>TODO APP</h1>
        </Link>
        <div className="flex items-center gap-3">
          <button onClick={switchDarkMode} className="border rounded-full p-1">
            {!darkMode && <MdDarkMode />}
            {darkMode && <MdOutlineDarkMode />}
          </button>
          <div className="text-xs border-2  border-red-600 rounded-full p-1.5">
            <p className="text-md">
              <span>{compledetTodoCount.completedCount}</span>/
              <span>{compledetTodoCount.totalCount}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-right">
              <span>
                {localUsername?.slice(0, 1).toUpperCase() +
                  localUsername?.slice(1)}
              </span>
            </h1>
            <button className="hover:text-yellow-400" onClick={logOut}>
              <ImExit />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
