import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ExportResult } from "../models/FileFormat";
import { convertFile } from "../requests/convert";
import { RootState } from "../store";

export const DownloadView = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const result: ExportResult = useSelector((state: RootState) => state.file.exportResult);
    const { file, exportOptions, exportResult } = useSelector((state: RootState) => state.file);
    useEffect(() => {
        if (!file || !exportOptions) {
            navigate('/');
        }
        dispatch(convertFile(file, exportOptions)) 
    }, [])

    useEffect(() => {
        switch (exportResult.status) {
            case 'error': {
                toast('Failed to convert file', { type: 'error'});
                return
            }
            case 'success': {
                window.open(URL.createObjectURL(exportResult?.blob));   
                navigate('/');
                toast('File converted!', { type: 'success' }); 
                return; 
            }
        }
    }, [exportResult])



    return (
        <React.Fragment>
            <h1>Thanks for using convrtify!</h1>
            <p>Your file is being converted and ready for download!</p>
            {result.status === 'loading' ? <p>Loading...</p> : <p>Complete!</p>}
            <ToastContainer />
        </React.Fragment>
    )
}