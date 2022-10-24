import { ExportOptions, ExportType } from "../models/FileFormat"
import { setExportResult } from "../reducers/FileReducer";
import HttpClient from "./http"

export const decodeBase64 = (base64: string, exportOptions: ExportOptions) => {
    return async (dispatch: any) => {
        dispatch(setExportResult({ 
            status: 'loading'
        }));
        try {
            const res = await HttpClient.post('/api/convrtify/convert-v1', base64, {
                responseType: 'blob',
                headers: {
                    'x-unbase': 'yes very much'
                },
            });
            dispatch(setExportResult({
                status: 'success',
                response: res.data,
                type: ExportType.PNG
            }));
        } catch (error) {
            dispatch(setExportResult({
                status: 'error'
            }));
        }
    }
}; 

export const convertFile = (file: any, exportOptions: ExportOptions) => {
    return async (dispatch: any) => {
        dispatch(setExportResult({ 
            status: 'loading'
        }));
        const formData = new FormData(); 
        formData.append('file', file); 
        try {
            const res = await HttpClient.post('/api/convrtify/convert-v1', formData, {
                headers: {
                    'x-unbase': exportOptions.mime === 'text/plain' ? 'hello' : null
                },
            });
            dispatch(setExportResult({
                status: 'success',
                response: res.data,
                type: ExportType.Base64
            }));
        } catch (error) {
            dispatch(setExportResult({
                status: 'error'
            }));
        }
    }
};