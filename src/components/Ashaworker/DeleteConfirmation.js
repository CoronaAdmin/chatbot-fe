import React from "react";

export default function DeleteConfirmation({
    Shown,
    Sure,
    toggle,
    DeleteSured,
    msg,
}) {
    function Delete() {
        DeleteSured(Sure);
        toggle(Shown);
    }
    function back() {
        toggle(Shown);
    }

    return (
        <div
            className={`${
                !Shown ? "flex" : "hidden"
            } fixed top-0 left-0 bg-red-100 h-screen w-full items-center justify-center z-10`}>
            <div className="pb-8 px-0 md:w-1/2 lg:w-1/3 bg-white shadow-lg mx-5 rounded">
                <div className="uppercase bg-red-700 pt-3 px-5 pb-2 text-lg text-white font-bold tracking-wide rounded-t">
                    Alert
                </div>
                <div className="px-5">
                    <div className="pb-8 pt-3 px-0 text-gray-800">
                        You are about to delete this{" "}
                        <span className="font-bold">{msg}</span>
                    </div>
                    <div className="flex justify-between font-bold tracking-wide">
                        <div className="flex">
                            <div
                                onClick={back}
                                className="flex items-center justify-center p-2 px-3 md:px-6 rounded bg-gray-300  hover:bg-gray-400 cursor-pointer">
                                Back
                            </div>
                        </div>
                        <div className="flex text-white">
                            <div
                                onClick={Delete}
                                className="flex items-center justify-center rounded p-2 px-3 md:px-6 bg-red-700 hover:bg-red-800 cursor-pointer">
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
