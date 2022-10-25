import { configureStore } from "@reduxjs/toolkit";
import encodeSlice from "./reducers/EncodeReducer";
import fileSlice from "./reducers/FileReducer";

const store = configureStore({
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['file/attachFile', 'file/setExportResult']
            }
        }),
    reducer: {
        file: fileSlice,
        encode: encodeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store; 