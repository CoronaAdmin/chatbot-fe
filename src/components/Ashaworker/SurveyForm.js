import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { FullLoading, Loading } from "../../components/common/Loader";
import { postSurvey } from "../../Redux/actions";
import { setStoreData } from "../../Redux/fireRequest";

function SurveyForm({ id }) {
    const dispatch = useDispatch();
    const [Questions, setQuestions] = useState({});
    const [Userid, setUserid] = useState("");
    const [Answer, setAnswer] = useState("");
    useEffect(() => {
        dispatch(fetchQuestions()).then((res) => {
            console.log(res);
            setQuestions(res.data.questions);
        });
    }, []);
    const [Form, setForm] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = {
            response: Form,
        };
        alert("submited");
        dispatch(postSurvey(Userid, result)).then((res) => {
            console.log(res);
        });
    };

    if (Questions.length === undefined) {
        return <FullLoading />;
    }
    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...Form };

        // error handling needed

        fieldValue[name] = value;

        setForm(fieldValue);
    };
    if (Questions.length === undefined) {
        return <Loading />;
    } else {
        return (
            <div className="my-5 m-0  m-auto">
                <div className="m-0 text-black text-2xl my-3 font-bold text-center m-auto">
                    Survey about {id}
                </div>
                <div className="max-w-xl  m-0 m-auto p-10 bg-white rounded shadow-xl">
                    <div className="mt-2 mb-2">
                        <label
                            className="block text-lg text-black "
                            htmlFor="name">
                            Enter your user id
                        </label>
                        <input
                            className="w-full focus:shadow-outline px-5 py-1 text-gray-700 bg-gray-200 rounded"
                            name="userid"
                            onChange={(e) => {
                                setUserid(e.target.value);
                            }}
                            type="text"
                            value={Userid}
                            placeholder="Your Answer"
                        />
                        <div className="text-xs italic text-red-500"></div>
                    </div>
                    {Questions.map((value, index) => {
                        return (
                            <div className="mt-2 mb-2" key={index}>
                                <label
                                    className="block text-lg text-black "
                                    htmlFor="name">
                                    {value.ques}
                                </label>
                                <input
                                    className="w-full focus:shadow-outline px-5 py-1 text-gray-700 bg-gray-200 rounded"
                                    name={value.id}
                                    onChange={handleChange}
                                    type="text"
                                    value={Form.answer}
                                    placeholder="Your Answer"
                                />
                                <div className="text-xs italic text-red-500"></div>
                            </div>
                        );
                    })}
                    <button
                        class="bg-red-500    hover:bg-red-400 m-0 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                        onClick={handleSubmit}>
                        {" "}
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default SurveyForm;
