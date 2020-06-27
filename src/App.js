import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES } from "./Common/constants";
import { FullLoading } from "./components/common/Loader";
import { getCurrentUser } from "./Redux/actions";
import PublicRouter from "./Router/PublicRouter";
import AshaworkerRouter from "./Router/AshaworkerRouter";
import CommonfolkRouter from "./Router/CommonfolkRouter";
import { useAbortableEffect } from "./util/useAbortableEffect";
function App() {
    const dispatch = useDispatch();
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    const [user, setUser] = useState(false);

    // const updateRefreshToken = () => {
    //   const refresh = localStorage.getItem('refresh_token');
    //   const access = localStorage.getItem('access_token');
    //
    //   // if access token is invalid and refresh token is valid
    //   // remove refresh token
    //
    //   if( !access && refresh ){
    //     localStorage.removeItem('refresh_token')
    //     document.location.reload();
    //     return;
    //   }
    //
    //   if(!refresh){
    //     return;
    //   }
    //   axios.post('https://api.care.coronasafe.in/api/v1/auth/token/refresh/',{
    //     refresh
    //   }).then(res=>{
    //     localStorage.setItem('access_token',res.data.access)
    //     localStorage.setItem('refresh_token',res.data.refresh)
    //   })
    //   .catch( err=>{
    //     console.log('Error when refreshing', err)
    //   })
    // }
    //
    // useEffect(() => {
    //   updateRefreshToken()
    //   setInterval(updateRefreshToken, 5 * 60 * 1000)
    // }, [])

    // Removing Causes Infinite Loop
    useAbortableEffect(
        async (status) => {
            const access = localStorage.getItem("login_access_token");
            if (access) {
                const res = await dispatch(getCurrentUser());
                if (!status.aborted && res && res.statusCode === 200) {
                    setUser(res.data);
                }
            } else {
                setUser(null);
            }
        },
        [dispatch]
    );

    // keep isLoading in redux, so that if any component is loading
    // App component will render loading page
    // This can be kept within AppRouter as well incase navbar needs
    // to be kept on UI
    if (user !== null && (!currentUser || currentUser.isFetching)) {
        return <FullLoading />;
    }

    if (currentUser && currentUser.data) {
        console.log("user:", currentUser.data.data.type);
        if (currentUser.data.data.type === USER_TYPES.COMMON_FOLK.type) {
            return <CommonfolkRouter />;
        } else if (currentUser.data.data.type === USER_TYPES.ASHA_WORKER.type) {
            return <AshaworkerRouter />;
        } else {
            return <PublicRouter />;
        }
    } else {
        return <PublicRouter />;
    }
}

export default App;
