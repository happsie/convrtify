import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExportOptions, ExportResult } from "../models/FileFormat";

type FileState = {
    file?: any; 
    base64?: any;
    exportOptions: ExportOptions; 
    exportResult: ExportResult;
}

const initialState: FileState = {
    file: null,
    exportOptions: {
        mime: "application/text",
        name: 'exported.txt'
    },
    exportResult: {
        status: "loading",
    }
}

export const fileSlice = createSlice({
    name: 'file', 
    initialState,
    reducers: {
        attachFile: (state, action: PayloadAction<any>) => {
            state.file = action.payload; 
        },
        attachBase64: (state, action: PayloadAction<string>) => {
            state.base64 = action.payload;
        },
        reset: (state) => {
            state.file = null;
            state.base64 = null; 
        },
        setExportOptions: (state, action: PayloadAction<ExportOptions>) => {
            state.exportOptions = action.payload; 
        },
        setExportResult: (state, action: PayloadAction<ExportResult>) => {
            state.exportResult = action.payload;
        }
    }
}); 

export const { attachFile, attachBase64,  reset, setExportOptions, setExportResult } = fileSlice.actions;

export default fileSlice.reducer;