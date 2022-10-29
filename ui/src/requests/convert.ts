import { ExportOptions, ExportType } from "../models/FileFormat"
import { setEncodedResponse, Status, updateEncodeStatus } from "../reducers/EncodeReducer";
import { setExportResult } from "../reducers/FileReducer";
import HttpClient from "./http"

type EncodeResponse = {
    encoded: string;
}

export const encodeFile = (file: File) => {
    return async (dispatch: any) => {
        dispatch(updateEncodeStatus(Status.Loading)); 
        try {
            const data: FormData = new FormData(); 
            data.append("file", file); 
            const res = await HttpClient.post<EncodeResponse>('/api/convrtify/encode-v1', data);
            dispatch(setEncodedResponse(res.data.encoded));
        } catch (error) {
            dispatch(updateEncodeStatus(Status.Error)); 
        }
    };
};

export const encodeText = (text: string) => {
    return async (dispatch: any) => {
        dispatch(updateEncodeStatus(Status.Loading)); 
        try {
            const res = await HttpClient.post<EncodeResponse>('/api/convrtify/encode-v1', {
                text: text
            });
            dispatch(setEncodedResponse(res.data.encoded))
        } catch (error) {
            dispatch(updateEncodeStatus(Status.Error)); 
        }
    };
};

/*
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
*/