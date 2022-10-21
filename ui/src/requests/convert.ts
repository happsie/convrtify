import { ExportOptions } from "../models/FileFormat"
import { setExportResult } from "../reducers/FileReducer";
import HttpClient from "./http"

export const convertFile = (file: any, exportOptions: ExportOptions) => async (dispatch: any) => {
    dispatch(setExportResult({ 
        status: 'loading'
    }));
    const formData = new FormData(); 
    formData.append('file', file); 
    try {
        const res = await HttpClient.post('/api/convrtify/convert-v1', formData, {
            responseType: 'blob',
            headers: {
                'X-FILE-CONTENT-TYPE': file.type,
                'X-EXPORT-NAME': exportOptions.name,
                'Accept': exportOptions.mime
            },
        });
        dispatch(setExportResult({
            status: 'success',
            blob: new Blob([res.data], {
                type: exportOptions.mime
            })
        }));
    } catch (error) {
        dispatch(setExportResult({
            status: 'error'
        }));
    }
}