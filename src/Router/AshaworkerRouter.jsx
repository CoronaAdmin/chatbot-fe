import React from "react";
import { useRoutes, useRedirect } from "hookrouter";
import Footer from "../components/common/Footer";
import AshaworkerNavbar from "../components/Navbars/AshaworkerNavbar";
import Homepage from "../components/Ashaworker/Homepage";

const routes = {
    "/ashaworker": () => <Homepage />,
};
// const links = [
//     {
//         link: "/home",
//         title: "Home",
//         icon: "",
//     },
// ];
const AshaworkerRouter = () => {
    useRedirect("/", "/ashaworker");
    const pages = useRoutes(routes);

    return (
        <div className="">
            <AshaworkerNavbar />
            {pages}
            {/* {!pages ? (
                <div className="h-screen flex justify-center py-16">
                    Error 404: Page not found
                </div>
            ) : (
                    <AshaworkerNavbar pages={pages} menus={links} />
                )} */}
            <Footer />
        </div>
    );
};

export default AshaworkerRouter;