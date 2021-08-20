import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "../Axios";
import { useHistory } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function LoginReg() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const registerUser = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/users/register", {
        name: userName,
        email: email,
        password: password,
        role: "Admin",
      })
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("authUser", JSON.stringify(res.data.user));
          history.push("/");
        }
        console.log("reg res >>>", res);
      })
      .catch((err) => {
        console.log("add err >>>", err);
      });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    await axios

      .post("/api/auth", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("authUser", JSON.stringify(res.data.user));
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("add err >>>", err);
      });
  };

  return (
    <div className="bg-blue-200 flex items-center justify-center h-screen">
      <div className="w-full max-w-md px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Login
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Register
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                "bg-white rounded-xl p-3",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
              )}
            >
              <div>
                <form className="flex flex-col">
                  <input
                    type="email"
                    placeholder="email"
                    className="bg-gray-50 py-2 px-6 rounded-lg my-2 font-OpenSans text-sm focus:outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    className="bg-gray-50 py-2 px-6 rounded-lg my-2 font-OpenSans text-sm focus:outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={loginUser}
                    className="bg-red-400 py-2 font-OpenSans my-2 text-sm text-white font-semibold rounded-lg"
                  >
                    Login
                  </button>
                </form>
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "bg-white rounded-xl p-3",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
              )}
            >
              <div>
                <form className="flex flex-col">
                  <input
                    type="text"
                    placeholder="username"
                    className="bg-gray-50 py-2 px-6 rounded-lg my-2 font-OpenSans text-sm focus:outline-none"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="email"
                    className="bg-gray-50 py-2 px-6 rounded-lg my-2 font-OpenSans text-sm focus:outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    className="bg-gray-50 py-2 px-6 rounded-lg my-2 font-OpenSans text-sm focus:outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={registerUser}
                    className="bg-red-400 py-2 my-2 font-OpenSans text-sm text-white font-semibold rounded-lg"
                  >
                    Register
                  </button>
                </form>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default LoginReg;
