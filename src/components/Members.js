import React, { useState } from "react";
import axios from "../Axios";

function Members({ user, members }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMember = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/users/register", {
        name: userName,
        email: email,
        password: password,
        role: "Member",
        parent: user.id,
      })
      .then((res) => {
        if (res) {
          setUserName("");
          setEmail("");
          setPassword("");
          console.log("member added successfully!");
        }
      })
      .catch((err) => {
        console.log("add err >>>", err);
      });
  };

  return (
    <div className="bg-gray-50 p-4 hidden md:block h-screen">
      <h1 className="text-lg font-OpenSans font-semibold">Team Members</h1>

      <div className="bg-gray-100 p-2 mt-4 rounded-xl">
        <p className="mb-4 ml-1 text-sm  font-OpenSans font-semibold">
          Add members to your team
        </p>
        <form>
          <input
            type="text"
            placeholder="give a username to member"
            className="w-full font-OpenSans text-sm font-normal my-1 py-1 2xl:py-3 px-2 2xl:px-4 rounded-lg focus:outline-none mb-2 "
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="email"
            placeholder="give a email to member"
            className="w-full font-OpenSans text-sm font-normal my-1 py-1 2xl:py-3 px-2 2xl:px-4 rounded-lg focus:outline-none mb-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="assign a password to member"
            className="w-full font-OpenSans my-1 py-1 2xl:py-3 px-2 2xl:px-4 text-sm font-normal rounded-lg focus:outline-none mb-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            onClick={registerMember}
            className="bg-red-400 w-full rounded-lg my-2 py-1 2xl:py-3 text-white font-OpenSans font-semibold"
          >
            submit
          </button>
        </form>
      </div>

      <div className="mt-4 h-80 2xl:h-3/4 overflow-y-auto">
        {members.map((m, i) => {
          return (
            <div
              key={i}
              className="my-2 bg-blue-50 py-1 2xl:py-2 px-4 font-OpenSans text-md font-semibold rounded-xl flex items-center"
            >
              <div className="w-7 h-7 rounded-full bg-blue-500 mr-2"></div>
              {m.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Members;
