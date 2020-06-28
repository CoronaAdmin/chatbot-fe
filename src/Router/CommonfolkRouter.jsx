import React from "react";
import { useRoutes, useRedirect } from "hookrouter";
import Footer from "../components/common/Footer";
import CommonfolkNavbar from "../components/Navbars/CommonfolkNavbar";
import Homepage from "../components/Commonfolk/Homepage";

const routes = {
    "/commonfolk": () => <Homepage />,
};
// const links = [
//     {
//         link: "/home",
//         title: "Home",
//         icon: "",
//     },
// ];
const CommonfolkRouter = () => {
    useRedirect("/", "/commonfolk");
    const pages = useRoutes(routes);

    return (
        <>
            <div className="">
                <CommonfolkNavbar />
                {pages}
                {/* {!pages ? (
                <div className="h-screen flex justify-center py-16">
                    Error 404: Page not found
                </div>
            ) : (
                    <AshaworkerNavbar pages={pages} menus={links} />
                )} */}
            </div>
            <Footer />
        </>
    );
};
export default CommonfolkRouter;
