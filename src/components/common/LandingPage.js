import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import { login, getCurrentUser } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";

export default function LandingPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    document.getElementById("googleButton");

    const dispatch = useDispatch();
    const responseGoogle = (response) => {
        const name = response.profileObj.name;
        const body = {
            email: response.profileObj.email,
        };

        dispatch(login(body))
            .then((resp) => {
                const { data: res } = resp;
                const { status: statusCode } = resp;

                if (res && statusCode === 201) {
                    localStorage.setItem(
                        "login_access_token",
                        res.access_token
                    );
                    localStorage.setItem("name", name);
                    dispatch(getCurrentUser());
                }
            })
            .catch((err) => {
                Notficiation.Error({
                    msg: "Check network connection and try again",
                });
            });
    };
    const fresponseGoogle = (response) => {
        Notficiation.Error({
            msg: "Something went wrong",
        });
    };
    return (
        <div className="flex flex-col items-center mt-40 mb-40">

            <div className="mb-10">
                <h2 class="font-bold mb-2 text-indigo-400 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    Welcome To Covid-19 Smart Surveys
                </h2>
            </div>
            <GoogleLogin
                clientId="768047427466-gutq6h5b3jbf8qkaccp09u3msdl52cus.apps.googleusercontent.com"
                buttonText="Sign In "
                onSuccess={responseGoogle}
                onFailure={fresponseGoogle}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
}
