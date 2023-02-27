import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Component/Auth/AuthSlice";


const store = configureStore({
    reducer:{
        auth:AuthSlice,
    }
})

export default store