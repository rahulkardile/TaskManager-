import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/UserSlice";

export const store = configureStore({
    reducer:{
        [userSlice.name] :userSlice.reducer},
    middleware: (defaultMid) => defaultMid({
        serializableCheck: false
    })
})

export type RootStates = ReturnType<typeof store.getState>