import React, { useEffect, useState } from "react";
import { navigate, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
import { getSurvey } from "../../Redux/actions";
import { FullLoading } from "../../components/common/Loader";
import AddSurvey from "./AddSurvey";
export default function Homepage() {
    const dispatch = useDispatch();
    const [Res, setRes] = useState({});
    const [Loading, setLoading] = useState(false);
    const [shown, setshown] = useState(false);
    const item = [
        { name: "survey 1", id: "1" },
        { name: "survey 2", id: "2" },
        { name: "survey 3", id: "3" },
        { name: "survey 4", id: "4" },
        { name: "survey 5", id: "5" },
    ];
    useEffect(() => {
        setLoading(true);
        dispatch(getSurvey()).then((res) => {
            // console.log("jishnu", res);
            setRes(res.data.surveys);
        });
    }, [dispatch, shown]);
    const addsurvey = () => {
        setshown(true);
    };
    const toggle = () => {
        setshown(!shown);
    };
    console.log(Res);
    if (Res.length === undefined) {
        return <FullLoading />;
    } else {
        if (Res.length < 2) {
            var colno = 2;
        } else {
            colno = 3;
        }
        return (
            <div>
                <div className={`my-20 ${!shown ? "block" : "hidden"}`}>
                    <div className="flex bg-red-200 px-2 py-3 flex-col mt-20 mb-20 sm:w-full rounded  lg:w-1/2 md:w-3/4  m-0 m-auto mt-10 ">
                        <div className={`grid grid-cols-${colno}`}>
                            <button
                                className="bg-red-600 font-semibold  text-white my-4 w-md mx-1 px-3 lg:mx-3 py-2 lg:text-lg text-center rounded text-md "
                                onClick={addsurvey}>
                                <span className="text-xl">+</span>
                                Add New Survey
                            </button>
                            {Res.map((value, index) => {
                                return (
                                    <A
                                        className="bg-red-500 font-semibold justify-center text-white my-4 w-md mx-1 px-3 lg:mx-3 py-2 lg:text-lg text-center rounded text-md "
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
