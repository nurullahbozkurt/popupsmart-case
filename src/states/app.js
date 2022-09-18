import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

import { DEFAULT_TODO } from "../statics/DEFAULT_TODO";

const AppContext = createContext();

const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [localUsername, setLocalUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // This state is used to add new todo
  const [addTask, setAddTask] = useState(DEFAULT_TODO);

  // This state is used to edit the todo
  const [editTask, setEditTask] = useState(DEFAULT_TODO);

  // This state is used to turn on add to-do mode
  const [activeAddTodo, setActiveAddTodo] = useState(false);

  // This state is used to turn on edit to-do modal
  const [editModalShow, setEditModalShow] = useState(false);

  // This state is used to select the todo date
  const [selectTodoDate, setSelectTodoDate] = useState(null);

  // This state is used to dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Dark classes set to html element
  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "true" ? true : false);
    if (darkMode) {
      return (
        document.querySelector("html").classList.add("dark"),
        document.querySelector("html").classList.add("bg-slate-800")
      );
    }
    document.querySelector("html").classList.remove("dark");
    document.querySelector("html").classList.remove("bg-slate-800");
  }, [darkMode]);

  // Get local storage data and set it to state
  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"));
    setLocalUsername(username);
  }, [setLocalUsername, localUsername]);

  return (
    <AppContext.Provider
      value={{
        addTask,
        editTask,
        darkMode,
        setAddTask,
        setEditTask,
        setDarkMode,
        localUsername,
        editModalShow,
        activeAddTodo,
        selectTodoDate,
        setEditModalShow,
        setLocalUsername,
        setActiveAddTodo,
        setSelectTodoDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useApp };
