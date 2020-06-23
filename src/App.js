import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FullLoading } from "./components/common/Loader";
import PublicRouter from "./Router/PublicRouter";
import { useAbortableEffect } from "./util/useAbortableEffect";
function App() {
    return < PublicRouter />;
}

export default App;