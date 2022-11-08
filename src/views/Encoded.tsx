import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { reset, setEncoded } from "../reducers/EncodeReducer";
import { RootState } from "../store";

export const EncodedView = () => {
    const dispatch: any = useDispatch();
    const encoded: string | undefined = useSelector((state: RootState) => state.encode.encoded);
    const text: string | undefined = useSelector((state: RootState) => state.encode.text);
    const file: File | undefined = useSelector((state: RootState) => state.encode.file);

    const encode = () => new Promise<any>((resolve, reject) => {
        const reader = new FileReader();
        if (!file) {
            return; 
        }
        reader.readAsBinaryString(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    useEffect(() => {
        if (text) {
            dispatch(setEncoded(btoa(unescape(encodeURIComponent(text)))));
        } else {
            const encodeFile = async () => {
                const result = await encode();
                const encoded = btoa(unescape(encodeURIComponent(result)));
                dispatch(setEncoded(encoded));
            }
            encodeFile();
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