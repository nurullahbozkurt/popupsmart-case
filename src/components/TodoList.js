import React from "react";
import { TiTick } from "react-icons/ti";
import { BsFlagFill } from "react-icons/bs";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useApp } from "../states/app";
import { useMutation } from "react-query";
import axios from "axios";
import useGetTodos from "../hooks/useGetTodos";
import Loading from "./Loading";

const DEFAULT_TODO = {
  title: "",
  content: "",
  isCompleted: false,
  priority: { isHigh: false, isMedium: false, isLow: false, isNone: true },
  createdAt: new Date(),
  deadline: new Date(),
};

const TodoList = ({ task }) => {
  const {
    setEditModalShow,
    setEditTask,
    setAddTask,
    addTask,
    activeAddTodo,
    setActiveAddTodo,
  } = useApp();
  const { refetch, isLoading } = useGetTodos();

  const editButtonHandler = async (task) => {
    await setEditTask(task);
    setAddTask(task);
    setEditModalShow(true);
  };

  const requestComletedTodo = useMutation(() => {
    return axios.put(
      `https://63132301b466aa9b03939063.mockapi.io/api/todos/${task?.id}`,
      addTask
    );
  });

  const handleCompetedTodo = async () => {
    setActiveAddTodo(false);
    await setAddTask({
      ...addTask,
      ...task,
      isCompleted: !task.isCompleted,
    });
    await requestComletedTodo.mutateAsync();
    refetch();
    setAddTask(DEFAULT_TODO);
  };

  const requestDeleteTodo = useMutation(() => {
    return axios.delete(
      `https://63132301b466aa9b03939063.mockapi.io/api/todos/${task?.id}`
    );
  });

  const deleteTodo = async () => {
    await requestDeleteTodo.mutateAsync();
    refetch();
  };
  return (
    <>
      <div className="py-1">
        <div className="border-y flex flex-col gap-1 py-1">
          <div className="flex items-center justify-between">
            <button
              onClick={handleCompetedTodo}
              className="group flex items-center gap-2"
            >
              <div
                className={`group-hover:text-gray-900 text-gray-300 border rounded-full `}
              >
                <TiTick />
              </div>
              <p
                className={`${
                  task.isCompleted ? "line-through" : ""
                } font-semibold `}
              >
                {task.title}
              </p>
            </button>
            <div className="flex items-center gap-3">
              {(requestDeleteTodo.isLoading ||
                requestComletedTodo.isLoading) && (
                <div>
                  <Loading />
                </div>
              )}
              <button
                onClick={deleteTodo}
                className="text-gray-600 hover:text-gray-900 text-xl"
              >
                <MdDeleteOutline />
              </button>
              {!task.isCompleted && (
                <button
                  onClick={() => editButtonHandler(task)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FiEdit />
                </button>
              )}

              {task.priority.isHigh && (
                <div className="text-red-700">
                  <BsFlagFill />
                </div>
              )}
              {task.priority.isMedium && (
                <div className="text-yellow-500">
                  <BsFlagFill />
                </div>
              )}
              {task.priority.isLow && (
                <div className="text-blue-500">
                  <BsFlagFill />
                </div>
              )}
              {task.priority.isNone && (
                <div className="text-gray-500">
                  <BsFlagFill />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between pl-7 text-sm">
            <p>{task.content}</p>
            <div>
              <p>{task.deadline && format(new Date(task.deadline), "PP")}</p>
              <p>{!task.deadline && format(new Date(task.createdAt), "PP")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
