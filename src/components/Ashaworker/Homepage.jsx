import React from "react";
import { navigate, A } from "hookrouter";

export default function Homepage() {
    const item = [
        { name: "survey 1", id: "1" },
        { name: "survey 2", id: "2" },
        { name: "survey 3", id: "3" },
        { name: "surbey 4", id: "4" },
        { name: "surbey 5", id: "5" },
    ];
    return (
        <div className="">
            <div className="flex bg-red-200 px-2 py-3 flex-col my-20 sm:w-full rounded  lg:w-1/2 md:w-3/4  m-0 m-auto mt-10 ">
                <div className="grid grid-cols-3">
                    {item.map((value, index) => {
                        return (
                            <A
                                className="bg-red-400 my-4 w-md mx-1 px-3 lg:mx-3 py-2 lg:text-lg text-center rounded text-md "
                                href={`/ashaworker/form/${value.id}`}
                                key={index}>
                                {value.name}
                            </A>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
