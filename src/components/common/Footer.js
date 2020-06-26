import React from "react";

export default function Footer({ signUp }) {
    return (
        <div className=" bg-red-500 bottom-0 w-full">
            <section className=" py-3 w-full">
                <div className="container mx-auto px-8">
                    <a
                        href="http://mgmits.ac.in/departments/computer-science-and-engineering/"
                        className="block text-red-100 text-center  font-bold text-sm sm:mb-2 hover:text-white ">
                        Powered by MITS CSE
                    </a>
                </div>
            </section>
        </div>
    );
}
