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

  // This state is used to turn on edit to-do mode
  const [editModalShow, setEditModalShow] = useState(false);

  // This state is used to select the todo date
  const [selectTodoDate, setSelectTodoDate] = useState(null);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"));
    setLocalUsername(username);
  }, [setLocalUsername, localUsername]);

  return (
    <AppContext.Provider
      value={{
        addTask,
        editTask,
        setAddTask,
        setEditTask,
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
