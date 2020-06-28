import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import * as Notify from "../../util/Notifications";
import { FullLoading } from "../../components/common/Loader";
import { postSurvey, removeSurvey, removeQuestion } from "../../Redux/actions";
import AddQuestion from "./AddQuestions";
import DeleteConfirmation from "./DeleteConfirmation";
import { navigate } from "hookrouter";
import { ICONS } from "../../Common/constants";
function SurveyForm({ id }) {
    const dispatch = useDispatch();
    const [Questions, setQuestions] = useState({});
    const [Userid, setUserid] = useState("");
    const [shown, setshown] = useState(false);
    const [Iderr, setIderr] = useState(false);
    const [delQues, setdelQues] = useState("");
    const [Loading, setLoading] = useState(false);
    const [Delsurvey, setDelsurvey] = useState(false);
    const [Sure, toggleSure] = useState(false);

    const [DelQuestion, setDelQuestion] = useState(false);
    const [ShowQuesdelete, setShowQuesdelete] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchQuestions(id)).then((res) => {
            if (res !== undefined) {
                if (res.status === 200) {
                    setQuestions(res.data.questions);
                }
                setLoading(false);
            }
        });
    }, [dispatch, ShowQuesdelete, shown, id]);
    const empty = (input) => {
        if (typeof input === "undefined" || input === null) return true;

        return input.replace(/\s/g, "").length < 1;
    };
    const [Form, setForm] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = {
            response: Form,
        };

        if (isNaN(Userid) === false && empty(Userid) === false) {
            dispatch(postSurvey(Userid, result)).then((res) => {
                if (res.status === 201) {
                    Notify.Success({ msg: "Submitted" });
                    window.location.reload(false);
                }
            });
        } else {
            Notify.Error({ msg: "Error in UserID" });
            setIderr(true);
        }
    };
    const toggle = () => {
        setshown(!shown);
    };

    const deleteSurvey = () => {
        setDelsurvey(!Delsurvey);
    };

    const deleteQuestion = (e) => {
        setdelQues(e);
        setShowQuesdelete(!ShowQuesdelete);
    };

    function DeleteSured() {
        toggleSure(!Sure);
    }

    if (Sure === true) {
        toggleSure(false);
        setLoading(true);
        dispatch(removeSurvey(id)).then((res) => {
            if (res.status === 200) {
                Notify.Success({ msg: "Survey Deleted" });
                navigate("/");
            }
        });
    }

    if (DelQuestion === true) {
        console.log(delQues);
        setDelQuestion(false);
        setLoading(true);
        dispatch(removeQuestion(delQues)).then((res) => {
            if (res.status === 200) {
                Notify.Success({ msg: "Question Deleted" });
            }
        });
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...Form };

        // error handling needed

        fieldValue[name] = value;

        setForm(fieldValue);
    };
    if (Questions.length === undefined || Loading === true) {
        return <FullLoading msg={"Loading Questions...."} />;
    } else if (Questions.length === 0) {
        return (
            <div>
                <div className="flex mt-10 flex-row">
                    <div
                        className={`${
                            shown ? "hidden" : "block"
                        }max-w-xl w-1/2  m-0 m-auto  text-right rounded`}>
                        <span className="text-red-600 text-lg font-semibold">
                            No Questions Found{"  "}
                        </span>
                        <button
                            onClick={toggle}
                            className="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                            <svg
                                viewBox="0 0 20 20"
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
                    <div className="w-1/2">
                        <button
                            class="bg-white text-gray-800 ml-3 text-sm font-bold rounded border-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-1 lg:py-2 lg:px-3 px-2 inline-flex items-center"
                            onClick={deleteSurvey}>
                            <span class="mr-2">Delete</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentcolor"
                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={`${shown ? "block" : "hidden"}`}>
                    <AddQuestion shown={shown} toggle={toggle} id={id} />
                </div>
                <div className={`${Delsurvey ? "block" : "hidden"}`}>
                    <DeleteConfirmation
                        Shown={!Delsurvey}
                        Sure={Sure}
                        toggle={deleteSurvey}
                        DeleteSured={DeleteSured}
                        msg="Survey"
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className={`${Delsurvey ? "block" : "hidden"}`}>
                    <DeleteConfirmation
                        Shown={!Delsurvey}
                        Sure={Sure}
                        toggle={deleteSurvey}
                        DeleteSured={DeleteSured}
                        msg="Survey"
                    />
                </div>
                <div className={`${ShowQuesdelete ? "block" : "hidden"}`}>
                    <DeleteConfirmation
                        Shown={!ShowQuesdelete}
                        Sure={DelQuestion}
                        toggle={() => {
                            setShowQuesdelete(!ShowQuesdelete);
                        }}
                        DeleteSured={() => {
                            setDelQuestion(!DelQuestion);
                        }}
                        msg="Question"
                    />
                </div>
                <div
                    className={`${
                        shown ? "hidden" : "block"
                    } my-5 m-0  m-auto`}>
                    <div className="m-0 text-black text-lg lg:text-2xl my-3 font-bold text-center m-auto">
                        Survey about {id}
                    </div>
                    <div className="max-w-xl  m-0 m-auto p-10 bg-white rounded shadow-xl">
                        <div className="flex flex-row">
                            <div className="m-0 m-auto w-3/4  items-center text-left ">
                                <span className="text-sm lg:text-md font-semibold">
                                    Add More Questions
                                </span>
                                <button
                                    onClick={toggle}
                                    className="p-0 ml-2 w-10 right-0 h-10 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                                    <svg
                                        viewBox="0 0 20 20"
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
                            <div className=" ">
                                <div class="">
                                    <button
                                        class="bg-white text-gray-800 text-sm font-bold rounded border-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-1 lg:py-2 lg:px-3 px-2 inline-flex items-center"
                                        onClick={deleteSurvey}>
                                        <span class="mr-1">Delete</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24">
                                            <path
                                                fill="currentcolor"
                                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 mb-2">
                            <label
                                className="block text-md lg:text-lg text-black "
                                htmlFor="name">
                                Enter your user id
                            </label>
                            <input
                                className={`${
                                    Iderr ? "border border-red-500" : ""
                                } w-full focus:shadow-outline px-5 py-1 text-gray-700 bg-gray-200 rounded`}
                                name="userid"
                                onChange={(e) => {
                                    setUserid(e.target.value);
                                    setIderr(false);
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
                                        className="block text-md lg:text-lg text-black "
                                        htmlFor="name">
                                        {value.ques}
                                    </label>
                                    <div className="flex flex-row">
                                        <input
                                            className="lg:w-full w-5/6 focus:shadow-outline px-5 py-1 text-gray-700 bg-gray-200 rounded"
                                            name={value.id}
                                            onChange={handleChange}
                                            type="text"
                                            value={Form.answer}
                                            placeholder="Your Answer"
                                        />
                                        <div className="w-1/6  justify-center ml-3">
                                            <button
                                                onClick={() => {
                                                    deleteQuestion(value.id);
                                                }}>
                                                <img
                                                    className="lg:h-8 h-6 w-6 lg:w-8"
                                                    src={ICONS.DELETE}
                                                    alt="delete"
                                                />
                                            </button>
                                        </div>
                                    </div>
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
