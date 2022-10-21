import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./reducers/FileReducer";

const store = configureStore({
    reducer: {
        file: fileSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store; 