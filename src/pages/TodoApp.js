import axios from "axios";
import { format } from "date-fns";
import { HiPlus } from "react-icons/hi";
import { useMutation } from "react-query";
import DatePicker from "react-datepicker";
import { BsFlagFill } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, useMemo } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdOutlineRunningWithErrors } from "react-icons/md";

import { useApp } from "../states/app";
import Header from "../components/Header";
import Loading from "../components/Loading";
import TodoList from "../components/TodoList";
import useGetAllTodo from "../hooks/useGetTodos";
import EditTaskModal from "../components/EditTaskModal";
import CustomDateInput from "../components/CustomDateInput";

const DEFAULT_TODO = {
  title: "",
  content: "",
  isCompleted: false,
  priority: "",
  createdAt: new Date(),
  deadline: new Date(),
};

const TodoApp = () => {
  const { data, refetch, isLoading } = useGetAllTodo();

  const {
    editTask,
    addTask,
    setAddTask,
    editModalShow,
    activeAddTodo,
    selectTodoDate,
    setActiveAddTodo,
    setSelectTodoDate,
  } = useApp();

  const [showCompletedTodo, setShowCompletedTodo] = useState(false);

  const viewCompletedTodo = () => {
    setShowCompletedTodo(!showCompletedTodo);
  };

  const requestAddTodo = useMutation(() => {
    return axios.post(
      "https://63132301b466aa9b03939063.mockapi.io/api/todos",
      addTask
    );
  });

  const handleSubmit = async () => {
    await requestAddTodo.mutateAsync();
    setAddTask(DEFAULT_TODO);
    setSelectTodoDate(null);
    refetch();
  };

  const todayTodos = useMemo(() => {
    return data?.filter(
      (item) =>
        format(
          new Date(item.deadline ? item.deadline : item.createdAt),
          "dd/MM/yyyy"
        ) === format(new Date(), "dd/MM/yyyy") && item.isCompleted === false
    );
  }, [data]);

  console.log("todayTodos", todayTodos);

  const overdueTodos = useMemo(() => {
    return data?.filter(
      (item) =>
        format(
          new Date(item.deadline ? item.deadline : item.createdAt),
          "dd/MM/yyyy"
        ) < format(new Date(), "dd/MM/yyyy") && item.isCompleted === false
    );
  }, [data]);

  console.log("overdueTodos", overdueTodos);

  const upComingTodos = useMemo(() => {
    return data?.filter(
      (item) =>
        format(
          new Date(item.deadline ? item.deadline : item.createdAt),
          "dd/MM/yyyy"
        ) > format(new Date(), "dd/MM/yyyy") && item.isCompleted === false
    );
  }, [data]);

  const completedTodos = useMemo(() => {
    return data?.filter((item) => item.isCompleted);
  }, [data]);

  useEffect(() => {
    setAddTask({
      ...addTask,
      deadline: selectTodoDate,
    });
  }, [selectTodoDate]);

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div className="font-nunito">
      <Header />
      <div className="container mx-auto px-[10px] md:w-2/3 ">
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center justify-between gap-2">
            <p className="text-2xl">Today</p>
            <p className="text-xs opacity-50">{format(new Date(), "PP")}</p>
          </div>
          {!showCompletedTodo && (
            <button
              onClick={viewCompletedTodo}
              className="flex items-center gap-1.5 text-2xl opacity-70"
            >
              <GrFormViewHide />
              <p className="text-sm">View Completed</p>
            </button>
          )}
          {showCompletedTodo && (
            <button
              onClick={viewCompletedTodo}
              className="flex items-center gap-1.5 text-2xl opacity-70"
            >
              <GrFormView />
              <p className="text-sm">View Completed</p>
            </button>
          )}
        </div>
        <div className="my-4">
          <div className="flex items-center gap-1 text-red-700">
            <h1 className="font-bold ">Overdue</h1>
            <RiErrorWarningFill />
          </div>
          {overdueTodos &&
            overdueTodos
              .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
              .reverse()
              .map((task) => <TodoList task={task} />)}
        </div>
        <div className="my-4">
          {
            <div>
              <h1 className="font-bold text-green-700">Today</h1>
            </div>
          }
          {todayTodos &&
            todayTodos
              .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
              .reverse()
              .map((task) => <TodoList task={task} />)}
        </div>
        <div className="my-4">
          <div className="flex items-center gap-1 text-yellow-500">
            <h1 className="font-bold ">Upcoming</h1>
            <MdOutlineRunningWithErrors />
          </div>
          {upComingTodos &&
            upComingTodos
              .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
              .reverse()
              .map((task) => <TodoList task={task} />)}
        </div>
        <button
          onClick={() => setActiveAddTodo(!activeAddTodo)}
          className="flex group items-center gap-2 opacity-80 my-5"
        >
          <div
            className={`${
              activeAddTodo
                ? "bg-red-700 text-white rounded-full"
                : "text-red-700"
            }   p-0.5 group-hover:rounded-full group-hover:text-white group-hover:bg-red-700`}
          >
            <HiPlus />
          </div>
          <p
            className={`${
              activeAddTodo ? "text-red-700" : ""
            } group-hover:text-red-700 text-sm`}
          >
            Add task
          </p>
        </button>
        {activeAddTodo && !editModalShow && (
          <div className="flex flex-col gap-2 border rounded p-2 mb-5">
            <div className="flex items-center justify-between">
              <input
                onChange={(e) =>
                  setAddTask({ ...addTask, title: e.target.value })
                }
                minLength="3"
                value={addTask.title}
                className="w-full px-2 outline-none"
                type="text"
                placeholder="Title .."
              />
              <div className="pr-3">
                <DatePicker
                  selected={selectTodoDate}
                  onChange={(date) => setSelectTodoDate(date)}
                  customInput={<CustomDateInput />}
                  withPortal
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <textarea
              onChange={(e) =>
                setAddTask({ ...addTask, content: e.target.value })
              }
              value={addTask.content}
              type="text"
              placeholder="Description"
              className="w-full outline-none px-2 placeholder:text-sm"
            />
            <div className="flex items-center justify-between gap-3 m-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setAddTask({
                      ...addTask,
                      priority: "high",
                    })
                  }
                  className={`${
                    addTask.priority === "high"
                      ? "opacity-100 border-b-[0.5px] border-red-500"
                      : "opacity-30 hover:opacity-100"
                  } text-red-500`}
                >
                  <BsFlagFill />
                </button>
                <button
                  onClick={() =>
                    setAddTask({
                      ...addTask,
                      priority: "medium",
                    })
                  }
                  className={`${
                    addTask.priority === "medium"
                      ? "opacity-100 border-b-[0.5px] border-yellow-500"
                      : "opacity-30 hover:opacity-100"
                  } text-yellow-500`}
                >
                  <BsFlagFill />
                </button>

                <button
                  onClick={() =>
                    setAddTask({
                      ...addTask,
                      priority: "low",
                    })
                  }
                  className={`${
                    addTask.priority === "low"
                      ? "opacity-100 border-b-[0.5px] border-blue-500"
                      : "opacity-30 hover:opacity-100"
                  } text-blue-500`}
                >
                  <BsFlagFill />
                </button>
                <button
                  onClick={() =>
                    setAddTask({
                      ...addTask,
                      priority: "none",
                    })
                  }
                  className={`${
                    addTask.priority === "none"
                      ? "opacity-100 border-b-[0.5px] border-gray-400"
                      : "opacity-30 hover:opacity-100"
                  } text-gray-400`}
                >
                  <BsFlagFill />
                </button>
              </div>
              <div className="flex items-center gap-3">
                {requestAddTodo.isLoading && <Loading />}
                <button
                  onClick={handleSubmit}
                  disabled={addTask.title === "" || addTask.title.length < 3}
                  className={`text-xs rounded bg-primaryBlue text-white hover:bg-primaryGreen px-3 py-1 disabled:opacity-50`}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}
        {showCompletedTodo && (
          <div className="mt-10">
            <h1 className="font-bold text-gray-500">Completed Todos</h1>
            <div>
              {completedTodos &&
                completedTodos
                  ?.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
                  .reverse()
                  .map((task) => <TodoList task={task} />)}
            </div>
          </div>
        )}
      </div>
      <EditTaskModal task={editTask} />
    </div>
  );
};

export default TodoApp;
