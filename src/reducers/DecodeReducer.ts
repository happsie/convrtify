import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../models/Exports";

type DecodeState = {
    base64?: string;
    response?: any; 
    status: Status;
}

const initialState: DecodeState = {
    status: Status.Idle
}

const decodeSlice = createSlice({
    name: 'decode', 
    initialState,
    reducers: {
        attachBase64: (state, action: PayloadAction<string>) => {
            state.base64 = action.payload;
        },
        updateDecodeStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        setDecoded: (state, action: PayloadAction<any>) => {
            state.response = action.payload; 
        },
        reset: (state) => {
            state.status = Status.Idle;
            state.response = undefined; 
            state.base64 = undefined;  
        },
    }
}); 

export const { attachBase64, updateDecodeStatus, setDecoded, reset } = decodeSlice.actions;

export default decodeSlice.reducer;