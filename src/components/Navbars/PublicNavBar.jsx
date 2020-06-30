import React from "react";
import { A } from "hookrouter";
export default function PublicNavBar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-indigo-500">
            <A href="/">
                <div className="flex items-center flex-shrink-0 text-white mr-6 py-6 pl-6">
                    <span className="font-semibold text-xl ml-1 tracking-tight">
                        Chatbot- CoronaAdmin
                    </span>
                </div>
            </A>
        </nav>
    );
}
