import React from "react";
import { TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function ToDoCard({ id, title, complete, deleteTask, editTodo }) {
  return (
    <Link
      to="#"
      onClick={() => editTodo(id, title)}
      className="relative rounded-lg shadow-md bg-white px-5 py-2 cursor-pointer flex justify-between items-center focus:outline-none text-sm font-medium"
    >
      <div className="flex items-center">
        <button className="w-5 h-5 mr-1" onClick={() => deleteTask(id)}>
          <TrashIcon className=" text-red-500" />
        </button>

        {title}
      </div>
      <input
        className="form-radio h-4 w-4"
        type="radio"
        name="radio"
        id={title}
        onClick={() => complete(id)}
      />
    </Link>
  );
}

export default ToDoCard;
