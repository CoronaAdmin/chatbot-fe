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
            <GoogleLogin
                clientId = {process.env.client_Id}
                buttonText="Sign In "
                onSuccess={responseGoogle}
                onFailure={fresponseGoogle}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
}
