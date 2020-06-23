import React, { useEffect } from "react";
import { A } from "hookrouter";
import { useSelector } from "react-redux";
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
function LandingPage() {
    // const state = useSelector((reduxState) => reduxState);
    // const { currentUser } = state;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    document.getElementById('googleButton');
    const responseGoogle = (response) => {
        console.log(response.profileObj.email);
    }
    const logout = () => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
    return (
        <div className="flex flex-col items-center mt-40 mb-40">
            <GoogleLogin
                clientId="768047427466-gutq6h5b3jbf8qkaccp09u3msdl52cus.apps.googleusercontent.com"
                buttonText="Sign In "
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            // cookiePolicy={'single_host_origin'}
            />
            <br />
            <br />
            <GoogleLogout
                clientId="768047427466-gutq6h5b3jbf8qkaccp09u3msdl52cus.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
        </div>

    );

}

export default LandingPage;
