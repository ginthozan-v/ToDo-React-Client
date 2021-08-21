import React, { useState, useEffect, Fragment } from "react";
import Header from "./components/Header";
import { PlusIcon } from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import ToDoCard from "./components/ToDoCard";
import CompletedCard from "./components/CompletedCard";
import Members from "./components/Members";
import Pusher from "pusher-js";
import axios from "./Axios";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const [inputValue, setInputValue] = useState("");
  const [toDo, setToDo] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [task, setTask] = useState("");
  const [selectTodo, setSelectTodo] = useState("");
  const user = JSON.parse(localStorage.getItem("authUser"));

  const history = useHistory();

  const addTask = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      await axios
        .post("/api/task/add", {
          task: inputValue,
          assigned: user.id,
          complete: false,
        })
        .then(() => {
          setInputValue("");
          setSelectTodo("");
        })
        .catch((err) => {
          console.log("add err >>>", err);
        });
    }
  };

  const fetchTask = async () => {
    await axios
      .get(`/api/task/sync`, {
        params: {
          complete: false,
          assigned: user.id,
        },
      })
      .then((res) => {
        setToDo(res.data);
      })
      .catch((err) => {
        console.log("fetch err >>>", err);
      });
  };

  const fetchCompletedTask = async () => {
    await axios
      .get(`/api/task/sync`, {
        params: {
          complete: true,
          assigned: user.id,
        },
      })
      .then((res) => {
        setCompleted(res.data);
      })
      .catch((err) => {
        console.log("Fetch complete err >>>", err);
      });
  };

  const handleComplete = async (value) => {
    await axios
      .put(`/api/task/update/${value}`, {
        complete: true,
      })
      .then(() => {
        setInputValue("");
        setSelectTodo("");
      })
      .catch((err) => {
        console.log("Complete err >>>", err);
      });
  };

  const handleDelete = async (value) => {
    await axios
      .delete(`/api/task/delete/${value}`)
      .then(() => {
        setInputValue("");
        setSelectTodo("");
      })
      .catch((err) => {
        console.log("Delete err >>>", err);
      });
  };

  const handleEdit = (id, value) => {
    setInputValue(value);
    setSelectTodo(id);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    await axios
      .put(`/api/task/update/${selectTodo}`, {
        task: inputValue,
      })
      .then(() => {
        setInputValue("");
        setSelectTodo("");
      })
      .catch((err) => {
        console.log("Complete err >>>", err);
      });
  };

  const logout = () => {
    localStorage.clear();
    history.push("/signin");
  };

  const fetchMembers = async () => {
    await axios
      .get(`/api/users/sync`, {
        params: {
          role: "Member",
          parent: user.id,
        },
      })
      .then((res) => {
        setMembers(res.data);
      })
      .catch((err) => {
        console.log("fetch err >>>", err);
      });
  };

  const assignTaskToMember = async (e) => {
    e.preventDefault();
    if (task !== "" && selectedMember !== "") {
      await axios
        .post("/api/task/add", {
          task: task,
          assigned: selectedMember._id,
          complete: false,
        })
        .then(() => {
          setTask("");
          setSelectedMember("");
          // alert("task assigned");
        })
        .catch((err) => {
          console.log("add err >>>", err);
        });
    }
  };

  useEffect(() => {
    fetchTask();
    fetchCompletedTask();
    fetchMembers();
  }, []);

  const pusher = new Pusher("73795cebf5c74388d2e3", {
    cluster: "ap2",
  });

  // sync task
  useEffect(() => {
    const taskChannel = pusher.subscribe("tasks");
    taskChannel.bind("inserted", (data) => {
      fetchTask();
    });
    taskChannel.bind("updated", (data) => {
      fetchTask();
      fetchCompletedTask();
    });
  }, []);

  // sync member
  useEffect(() => {
    const memberChannel = pusher.subscribe("users");
    memberChannel.bind("inserted", (data) => {
      fetchMembers();
    });
  }, []);

  return (
    <div>
      <Header user={user} logout={logout} />

      <div className="md:grid grid-cols-4 h-screen">
        <main className="px-4 md:px-20 pt-5 col-span-3">
          <h1 className="font-Anton text-4xl text-left">My Tasks</h1>
          <div className="my-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            {/* TODO */}
            <div className="bg-gray-50 rounded-2xl h-96 w-full md:w-72 2xl:w-96 2xl:h-100">
              <div className="px-4 py-2 border-b font-OpenSans text-sm font-bold">
                <h1>To Do</h1>
              </div>

              {/* INPUT FIELD */}
              <div className="pt-2 px-4">
                <form className="flex items-center">
                  {user.role === "Admin" && (
                    <>
                      <input
                        type="text"
                        placeholder="create task"
                        className=" w-full h-7 text-sm px-2 bg-gray-100 text-gray-500 shadow-sm focus:outline-none focus:ring-2 ring-red-400 rounded-sm mr-2"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />

                      <button
                        className="w-7 h-7"
                        onClick={selectTodo !== "" ? updateTask : addTask}
                      >
                        <PlusIcon className="text-red-500 bg-red-300 p-1 rounded-full" />
                      </button>
                    </>
                  )}
                </form>
              </div>

              <div className="my-2 h-72 2xl:h-96  overflow-y-auto">
                <div className="px-4 py-2 space-y-2">
                  {toDo.length > 0 &&
                    toDo.map((task) => {
                      return (
                        <ToDoCard
                          key={task._id}
                          id={task._id}
                          title={task.task}
                          complete={handleComplete}
                          deleteTask={handleDelete}
                          editTodo={handleEdit}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            {/* Completed */}
            <div className="bg-gray-50 rounded-2xl h-96 w-full md:w-72 2xl:w-96 2xl:h-100">
              <div className="px-4 py-2 border-b font-OpenSans text-sm font-bold">
                <h1>Completed</h1>
              </div>

              <div className="my-2 h-80 2xl:h-96 overflow-y-auto">
                <div className="px-4  space-y-2">
                  {completed.length > 0 &&
                    completed.map((task) => {
                      return (
                        <CompletedCard
                          key={task._id}
                          id={task._id}
                          title={task.task}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            {/* Add task to member */}

            {user.role === "Admin" && (
              <div className="bg-gray-50 rounded-2xl h-96 w-full md:w-72 2xl:w-96 2xl:h-100">
                <div className="px-4 py-2 border-b font-OpenSans text-sm font-bold">
                  <h1>Assign task to member</h1>
                </div>

                <div className="my-2 h-80 overflow-y-auto">
                  <div className="px-4  space-y-2">
                    <form>
                      <div className="w-full mb-2">
                        <Listbox
                          value={selectedMember}
                          onChange={setSelectedMember}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-sm cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                              <span className="block truncate">
                                {selectedMember
                                  ? selectedMember.name
                                  : "Choose a member"}
                              </span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {members.map((person, personIdx) => (
                                  <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                      `${
                                        active
                                          ? "text-amber-900 bg-amber-100"
                                          : "text-gray-900"
                                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          } block truncate`}
                                        >
                                          {person.name}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`${
                                              active
                                                ? "text-amber-600"
                                                : "text-amber-600"
                                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                          >
                                            <CheckIcon
                                              className="w-5 h-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      <input
                        type="text"
                        placeholder="task"
                        className="w-full font-OpenSans text-sm font-normal my-1 py-1 2xl:py-3 px-2 2xl:px-4 rounded-lg focus:outline-none mb-2 "
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                      />
                      <button
                        onClick={assignTaskToMember}
                        className="bg-red-400 w-full rounded-lg my-2 py-1 2xl:py-3 text-white font-OpenSans font-semibold"
                      >
                        submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        {user.role === "Admin" && (
          <div>
            <Members user={user} members={members} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
