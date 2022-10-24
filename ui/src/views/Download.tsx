import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ExportResult, ExportType } from "../models/FileFormat";
import { convertFile, decodeBase64 } from "../requests/convert";
import { RootState } from "../store";

export const DownloadView = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const [render, setRender] = useState(''); 
    const result: ExportResult = useSelector((state: RootState) => state.file.exportResult);
    const { file, base64, exportOptions, exportResult } = useSelector((state: RootState) => state.file);
    useEffect(() => {
        if (!file || !exportOptions) {
            //navigate('/');
        }
        if (base64) {
            dispatch(decodeBase64(base64, exportOptions)); 
            return
        }
        dispatch(convertFile(file, exportOptions)) 
    }, []);

    useEffect(() => {
        switch (exportResult.status) {
            case 'error': {
                toast('Failed to convert file', { type: 'error'});
                return
            }
            case 'success': {
                onSuccess(exportResult)
                return; 
            }
        }
    }, [exportResult]);

    const onSuccess = (result: ExportResult) => {
        toast('File converted!', { type: 'success' }); 
        if (result?.response && result?.type === ExportType.Base64) {
            setRender(result?.response)
        } else {
            window.open(URL.createObjectURL(result.response))
        }
    }; 

    return (
        <React.Fragment>
            <h1>Thanks for using convrtify!</h1>
            <p>Your file is being converted and ready for download!</p>
            {result.status === 'loading' ? <p>Loading...</p> : <p>Complete!</p>}
            {render && render.length > 0 ? render : ''}
            <ToastContainer />
        </React.Fragment>
    )
}