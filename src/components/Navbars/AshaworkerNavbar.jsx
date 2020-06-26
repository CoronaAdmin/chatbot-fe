import React from "react";
import { A, navigate } from "hookrouter";
export default function AshaworkerNavBar() {
    const logout = () => {
        localStorage.removeItem("login_access_token");
        localStorage.removeItem("login_refresh_token");
        navigate("/");
        window.location.reload();
    };
    return (
        <nav className="flex items-center justify-between flex-wrap bg-red-500">
            <A href="/">
                <div className="flex items-center flex-shrink-0 text-white mr-6 py-6 pl-6">
                    <span className="font-semibold text-xl sm:text-lg ml-1 tracking-tight">
                        Welcome AshaWorker
                    </span>
                </div>
            </A>
            <button
                className="flex items-center border-4 hover:border-4 hover:border-white flex-shrink-0 text-red-500 hover:text-white hover:bg-red-500 mr-6 py-2 px-2  font-semibold text-md justify-center md:px-6 rounded bg-white cursor-pointer"
                onClick={logout}>
                Logout
            </button>
        </nav>
    );
}
