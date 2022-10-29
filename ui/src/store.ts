import { configureStore } from "@reduxjs/toolkit";
import encodeSlice from "./reducers/EncodeReducer";
import decodeSlice from "./reducers/DecodeReducer";

const store = configureStore({
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['file/attachFile', 'file/setExportResult']
            }
        }),
    reducer: {
        encode: encodeSlice,
        decode: decodeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store; 