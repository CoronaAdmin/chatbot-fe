import React, { useEffect, useState } from "react";
import { A } from "hookrouter";
import { useDispatch } from "react-redux";
import { getSurvey } from "../../Redux/actions";
import { FullLoading } from "../../components/common/Loader";
import AddSurvey from "./AddSurvey";
export default function Homepage() {
    const dispatch = useDispatch();
    const [Res, setRes] = useState({});
    const [shown, setshown] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getSurvey()).then((res) => {
            if (res !== undefined) {
                setRes(res.data.surveys);
            }
        });
    }, [dispatch, shown]);
    const addsurvey = () => {
        setshown(true);
    };
    const toggle = () => {
        setshown(!shown);
    };
    if (Res.length === undefined) {
        return <FullLoading msg={"Loading surveys...."} />;
    } else {
        if (Res.length < 2) {
            var colno = 2;
        } else {
            colno = 3;
        }
        return (
            <div>
                <div className={` my-20 ${!shown ? "block" : "hidden"}`}>
                    <div className="flex bg-red-200 rounded px-2 py-3 flex-col mt-20 mb-20 sm:w-full rounded  lg:w-1/2 md:w-3/4  m-0 m-auto mt-10 ">
                        <div className={`grid grid-cols-${colno}`}>
                            <button
                                className="bg-red-600 font-semibold  text-white my-4 w-md mx-1 px-3 lg:mx-3 py-2 lg:text-lg text-center rounded text-md "
                                onClick={addsurvey}>
                                Add New
                            </button>
                            {Res.map((value, index) => {
                                return (
                                    <A
                                        className="bg-red-500 hover:bg-red-600 hover:shadow-md font-semibold justify-center text-white my-4 w-md mx-1 px-3 lg:mx-3 py-2 lg:text-lg text-center rounded text-sm lg:text-lg"
                                        href={`/ashaworker/form/${value.id}`}
                                        key={index}>
                                        {value.name}
                                    </A>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={`${shown ? "block" : "hidden"}`}>
                    <AddSurvey shown={shown} toggle={toggle} />
                </div>
            </div>
        );
    }
}
