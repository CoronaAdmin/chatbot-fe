import React from "react";

function SurveyForm({ id }) {
    const item = [
        { id: "1", name: "what is name" },
        { id: "2", name: "address" },
        { id: "3", name: "age" },
    ];
    const handleSubmit = () => {
        alert("submited");
    };
    return (
        <div className="    m-0 min-h-screen m-auto">
            <div className="m-0 text-black text-2xl my-3 font-bold text-center m-auto">
                Survey about {id}
            </div>
            <form onSubmit={handleSubmit} className="max-w-xl  m-0 m-auto p-10 bg-white rounded shadow-xl">
                {item.map((value, index) => {
                    return (
                        <div className="mt-2 mb-2">
                            <label
                                className="block text-lg text-black "
                                htmlFor="name">
                                {value.name}
                            </label>
                            <input
                                className="w-full focus:shadow-outline px-5 py-1 text-gray-700 bg-gray-200 rounded"
                                id="hotel-name"
                                name={value.name}
                                value=""
                                onChange=""
                                type="text"
                                placeholder="Your Answer"
                            />
                            <div className="text-xs italic text-red-500"></div>
                        </div>
                    );
                })}
                <button
                    class="bg-red-500    hover:bg-red-400 m-0 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    type="submit">
                    {" "}
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SurveyForm;
