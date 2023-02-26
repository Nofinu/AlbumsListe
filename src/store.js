import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Component/Auth/authSlice";


const store = configureStore({
    reducer:{
        auth:authSlice,
    }
})

export default store