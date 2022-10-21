import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./reducers/FileReducer";

const store = configureStore({
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['file/attachFile', 'file/setExportResult']
            }
        }),
    reducer: {
        file: fileSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store; 