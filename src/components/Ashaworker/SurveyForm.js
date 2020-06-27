import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import * as Notify from "../../util/Notifications";
import { FullLoading, Loading } from "../../components/common/Loader";
import { postSurvey } from "../../Redux/actions";
import AddQuestion from "./AddQuestions";
function SurveyForm({ id }) {
    const dispatch = useDispatch();
    const [Questions, setQuestions] = useState({});
    const [Userid, setUserid] = useState("");
    const [shown, setshown] = useState(false);
    useEffect(() => {
        dispatch(fetchQuestions(id)).then((res) => {
            if (res.status === 200) {
                setQuestions(res.data.questions);
            }
        });
    }, [dispatch, shown, id]);
    const [Form, setForm] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = {
            response: Form,
        };
        if (typeof Number(Userid) === "number") {
            dispatch(postSurvey(Userid, result)).then((res) => {
                if (res.status === 201) {
                    Notify.Success({ msg: "Submitted" });
                    window.location.reload(false);
                }
            });
        } else {
            Notify.Error({ msg: "Error in UserID" });
        }
    };
    const toggle = () => {
        setshown(!shown);
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
    if (Questions.length === 0) {
        return (
            <div>
                <div
                    className={`${
                        shown ? "hidden" : "block"
                    }max-w-xl min-h-screen  m-0 m-auto p-10 text-center rounded`}>
                    <span className="text-red-600 text-lg font-semibold">
                        No Questions Found{"  "}
                    </span>
                    <button
                        onClick={toggle}
                        className="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                        <svg
                            viewBox="0 0 20 20"
                            enable-background="new 0 0 20 20"
                            className="w-6 h-6 inline-block">
                            <path
                                fill="#FFFFFF"
                                d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                            />
                        </svg>
                    </button>
                </div>
                <div className={`${shown ? "block" : "hidden"}`}>
                    <AddQuestion shown={shown} toggle={toggle} id={id} />
                </div>
            </div>
        );
    } else if (Questions.length === undefined) {
        return <Loading />;
    } else {
        return (
            <div>
                <div>{shown && <FullLoading />}</div>
                <div
                    className={`${shown ? "hidden" : "block"}my-5 m-0  m-auto`}>
                    <div className="m-0 text-black text-2xl my-3 font-bold text-center m-auto">
                        Survey about {id}
                    </div>
                    <div className="max-w-xl  m-0 m-auto p-10 bg-white rounded shadow-xl">
                        <div className="m-0 m-auto   items-end">
                            <span className="text-md font-semibold">
                                Add More Questions
                            </span>
                            <button
                                onClick={toggle}
                                className="p-0 w-10 right-0 h-10 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                                <svg
                                    viewBox="0 0 20 20"
                                    enable-background="new 0 0 20 20"
                                    className="w-6 h-6 inline-block">
                                    <path
                                        fill="#FFFFFF"
                                        d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                                    />
                                </svg>
                            </button>
                        </div>
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
                            className="bg-red-500    hover:bg-red-400 m-0 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                            onClick={handleSubmit}>
                            {" "}
                            Submit
                        </button>
                    </div>
                </div>
                <div className={`${shown ? "block" : "hidden"}`}>
                    <AddQuestion shown={shown} toggle={toggle} id={id} />
                </div>
            </div>
        );
    }
}

export default SurveyForm;
