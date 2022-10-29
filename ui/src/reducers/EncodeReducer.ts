import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../models/Exports";

type EncodeState = {
    text?: string; 
    file?: File; 
    status: Status;
    encoded?: string; 
}

const initialState: EncodeState = {
    status: Status.Idle
}

const encodeSlice = createSlice({
    name: 'encode', 
    initialState,
    reducers: {
        attachFile: (state, action: PayloadAction<File>) => {
            state.file = action.payload; 
        },
        attachText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        updateEncodeStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        setEncoded: (state, action: PayloadAction<string>) => {
            state.encoded = action.payload; 
            state.status = Status.Success;
        },
        reset: (state) => {
            state.encoded = undefined; 
            state.file = undefined;
            state.status = Status.Idle; 
            state.text = undefined;
        },
    }
}); 

export const { attachFile, attachText, updateEncodeStatus, setEncoded, reset } = encodeSlice.actions;

export default encodeSlice.reducer;