import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { reset } from "../reducers/EncodeReducer";
import { encodeFile, encodeText } from "../requests/convert";
import { RootState } from "../store";

export const DownloadView = () => {
    const dispatch: any = useDispatch(); 
    const encoded: string | undefined = useSelector((state: RootState) => state.encode.encoded); 
    const text: string | undefined  = useSelector((state: RootState) => state.encode.text); 
    const file: File = useSelector((state: RootState) => state.encode.file); 

    useEffect(() => {
        if (text) {
            dispatch(encodeText(text)); 
        } else {
            dispatch(encodeFile(file));
        }

        return () => {
            dispatch(reset());
        }
    }, []); 

    return (
        <section>
            <article>
                <p>Congrats! Your text/file has been encoded to base64</p>
                <div>
                    {encoded}
                </div>
            </article>
        </section>
    )
}