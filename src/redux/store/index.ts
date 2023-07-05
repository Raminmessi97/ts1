import { configureStore } from "@reduxjs/toolkit";
// import { githubApi } from "./github/github.api";
import rootReducer from "../reducers/rootReducer";
import apiMiddleware from "../middlewares/apiMiddleware";
import { authApi } from '../api/authApi';
// import apiMiddleware from "../middlewares/apiMiddleware";

export const store = configureStore({
    reducer:rootReducer,
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(
    //     // apiMiddleware,
    //     authApi.middleware
    // )
    middleware:(getDefaultMiddleware)=> [...getDefaultMiddleware(),authApi.middleware,apiMiddleware],
})

