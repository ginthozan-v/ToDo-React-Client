import React from "react";
import { Link } from "react-router-dom";

function Header({ user, logout }) {
  return (
    <header className="flex justify-between items-center px-4 md:px-20 py-2 border-b">
      <h1 className="text-xl font-Anton">ToDo :</h1>
      <div className="flex items-center">
        <div className="profile-pic bg-red-200 w-7 h-7 md:w-10 md:h-10 rounded-full mr-2"></div>
        <Link to="#" onClick={logout}>
          <p className="font-Anton text-lg">{user?.name}</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
