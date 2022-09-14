import axios from "axios";
import { format } from "date-fns";
import { useMutation } from "react-query";
import { IoClose } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { Fragment, useEffect } from "react";
import { BsFlagFill } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";

import Loading from "./Loading";
import { useApp } from "../states/app";
import useGetTodos from "../hooks/useGetTodos";
import CustomDateInput from "./CustomDateInput";
import { DEFAULT_TODO } from "../statics/DEFAULT_TODO";

const EditTaskModal = ({ task }) => {
  const { refetch } = useGetTodos();

  const {
    addTask,
    setAddTask,
    editModalShow,
    selectTodoDate,
    setEditModalShow,
    setSelectTodoDate,
  } = useApp();

  const onClose = () => {
    setEditModalShow(false);
    setAddTask(DEFAULT_TODO);
  };

  const requestEditTodo = useMutation(() => {
    return axios.put(
      `https://63132301b466aa9b03939063.mockapi.io/api/todos/${task?.id}`,
      addTask
    );
  });

  const handleSubmit = async () => {
    await requestEditTodo.mutateAsync();
    await refetch();
    onClose();
  };

  useEffect(() => {
    setAddTask({
      ...addTask,
      deadline: selectTodoDate,
    });
  }, []);

  return (
    <>
      <Transition appear show={editModalShow} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-2 md:p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform  rounded-2xl bg-white p-3 md:p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    <div className="flex items-center justify-between">
                      <h1 className="text-md">
                        Edit Task
                        <span className="text-xs text-gray-500 mx-1">
                          {task?.title}
                        </span>
                      </h1>
                      <button
                        onClick={onClose}
                        className="text-xl hover:text-black"
                      >
                        <IoClose />
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                      <div className="flex flex-col gap-2 border rounded p-1 md:p-2">
                        <div className="flex items-center justify-between">
                          <input
                            onChange={(e) =>
                              setAddTask({ ...addTask, title: e.target.value })
                            }
                            value={addTask.title}
                            className="w-full px-2 outline-none"
                            type="text"
                            placeholder="Title .."
                          />
                          <div className="pr-3 z-10">
                            <DatePicker
                              selected={selectTodoDate}
                              onChange={(date) => setSelectTodoDate(date)}
                              value={format(
                                new Date(addTask.deadline),
                                "dd/MM/yyyy"
                              )}
                              customInput={<CustomDateInput />}
                              dateFormat="dd/MM/yyyy"
                            />
                          </div>
                        </div>
                        <input
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
                          <div className="flex items-center gap-2">
                            {requestEditTodo.isLoading && <Loading />}
                            <button
                              onClick={handleSubmit}
                              disabled={addTask.title === "" ? true : false}
                              className={`text-xs rounded bg-primaryBlue text-white hover:bg-primaryGreen px-3 py-1 disabled:opacity-50`}
                            >
                              Update Task
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default EditTaskModal;
