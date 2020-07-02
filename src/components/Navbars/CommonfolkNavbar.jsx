import React from "react";
import { A, navigate } from "hookrouter";
export default function CommonfolkNavBar() {
    const logout = () => {
        localStorage.removeItem("login_access_token");
        localStorage.removeItem("login_refresh_token");
        localStorage.removeItem("name");
        navigate("/");
        window.location.reload();
    };
    return (
        <nav className="flex items-center justify-between flex-wrap bg-indigo-500">
            <div className="w-2/3">
                <A
                    href="/"
                    className="flex w-full lg:w-1/3 items-center text-white mr-6 py-6 pl-6">
                    <span className="font-semibold text-md lg:text-xl md:text-xl ml-1 tracking-tight">
                        Welcome {localStorage.getItem("name")}
                    </span>
                </A>
            </div>
            <button
                className="flex items-center text-sm md:text-lg lg:text-lg border-4 hover:border-4 hover:border-white  text-indigo-500 hover:text-white hover:bg-indigo-500 mr-6 py-2 px-1  font-semibold text-md justify-center md:px-6 rounded bg-white cursor-pointer"
                onClick={logout}>
                Logout
            </button>
        </nav>
    );
}
