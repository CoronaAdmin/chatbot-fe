import React from "react";
import "../styles/Loader.css";
export const Loading = ({ msg }) => {
    return (
        <div className="flex justify-center items-center p-10">
            <div className=" text-center ">
                {/* <img src={img} className="App-logo" alt="logo" /> */}
                {msg}
                {msg === undefined && <div>Loading....</div>}
            </div>
        </div>
    );
};

export const FullLoading = ({ msg, color = "indigo-100" }) => {
    return (
        <div
            className={`h-screen w-full items-center flex flex-col justify-center overflow-hidden bg-${color}`}>
            <Loading msg={msg} />
        </div>
    );
};
