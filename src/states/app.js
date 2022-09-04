import { createContext, useContext, useState } from "react";

const AppContext = createContext();
const useApp = () => useContext(AppContext);

const DEFAULT_TODO = {
  title: "",
  content: "",
  isCompleted: false,
  priority: { isHigh: false, isMedium: false, isLow: false, isNone: true },
  createdAt: new Date(),
  deadline: new Date(),
};

const AppProvider = ({ children }) => {
  const [localUsername, setLocalUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [editModalShow, setEditModalShow] = useState(false);
  const [addTask, setAddTask] = useState(DEFAULT_TODO);
  const [editTask, setEditTask] = useState(false);
  const [selectTodoDate, setSelectTodoDate] = useState(null);
  const [activeAddTodo, setActiveAddTodo] = useState(false);

  return (
    <AppContext.Provider
      value={{
        localUsername,
        setLocalUsername,
        editModalShow,
        setEditModalShow,
        editTask,
        setEditTask,
        addTask,
        setAddTask,
        selectTodoDate,
        setSelectTodoDate,
        activeAddTodo,
        setActiveAddTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useApp };
