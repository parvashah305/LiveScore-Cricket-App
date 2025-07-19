import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar bg-white text-gray-900 shadow-md border-b-2 border-green-600 px-2 sm:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="hover:text-green-500 font-semibold">Live</Link>
              </li>
              <li>
                <Link to="/upcoming" className="hover:text-green-500 font-semibold">Upcoming</Link>
              </li>
              <li>
                <Link to="/recent" className="hover:text-green-500 font-semibold">Recent</Link>
              </li>
            </ul>
          </div>
          <span className="ml-2 text-green-600 font-extrabold text-2xl tracking-tight flex items-center gap-2">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#22c55e" />
              <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="1.5" />
            </svg> */}
            LiveScore
          </span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="hover:text-green-600 font-semibold">Live</Link>
            </li>
            <li>
              <Link to="/upcoming" className="hover:text-green-600 font-semibold">Upcoming</Link>
            </li>
            <li>
              <Link to="/recent" className="hover:text-green-600 font-semibold">Recent</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a target="_blank" href="https://github.com/parvashah305?tab=repositories" className="ri-github-line text-2xl border rounded-md mx-4 px-2 cursor-pointer text-green-600 border-green-600 hover:bg-green-50 transition-colors"></a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
