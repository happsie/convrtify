import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Mime {
    PDF = 'application/pdf',
    PNG = 'image/png',
    XML = 'application/xml'
}

export enum Status {
    Idle = 'Idle',
    Loading = 'Loading',
    Success = 'Success',
    Error = 'Error'
}

export type File = {
    file: any; 
    mime: Mime; 
}

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
    name: 'file', 
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
        setEncodedResponse: (state, action: PayloadAction<string>) => {
            state.encoded = action.payload; 
            state.status = Status.Success;
        },
        reset: (state) => {
            state = {
                status: Status.Idle,
                text: undefined,
                file: undefined,
                encoded: undefined,

            };
        },
    }
}); 

export const { attachFile, attachText, updateEncodeStatus, setEncodedResponse, reset } = encodeSlice.actions;

export default encodeSlice.reducer;