import { navigate, usePath } from "hookrouter";
import React, { useEffect, useState, useRef } from "react";
import Footer from "../common/Footer";
const img = "logo";
const logoBlack = "text logo";

const NavBar = ({ menus, pages }) => {
    const path = usePath();
    const url = path.split("/");
    console.log(url);
    const [drawer, setDrawer] = useState(false);

    return <h1>Private Navbar</h1>;
};

export default NavBar;
