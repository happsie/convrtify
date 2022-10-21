import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum OutputFormat {
    PDF,
    PNG,
    BASE64
}

type ExportOptions = {
    format: OutputFormat; 
    name: string; 
}

type FileState = {
    file?: any; 
    exportOptions: ExportOptions; 
}

const initialState: FileState = {
    file: null,
    exportOptions: {
        format: OutputFormat.PDF,
        name: 'exported.pdf'
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
        }
    }
}); 

export const { attachFile, removeFile, setExportOptions } = fileSlice.actions;

export default fileSlice.reducer;