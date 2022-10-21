import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExportOptions, ExportResult } from "../models/FileFormat";

type FileState = {
    file?: any; 
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
        blob: null
    }
}

export const fileSlice = createSlice({
    name: 'file', 
    initialState,
    reducers: {
        attachFile: (state, action: PayloadAction<any>) => {
            state.file = action.payload; 
        },
        removeFile: (state) => {
            state.file = null; 
        },
        setExportOptions: (state, action: PayloadAction<ExportOptions>) => {
            state.exportOptions = action.payload; 
        },
        setExportResult: (state, action: PayloadAction<ExportResult>) => {
            state.exportResult = action.payload;
        }
    }
}); 

export const { attachFile, removeFile, setExportOptions, setExportResult } = fileSlice.actions;

export default fileSlice.reducer;