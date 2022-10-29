import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ConversionMode } from "../models/Exports";
import { attachBase64 } from "../reducers/DecodeReducer";
import { attachFile, attachText } from "../reducers/EncodeReducer";

export const StartView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mode, setMode] = useState<ConversionMode>(ConversionMode.From);
  
    const onFileAttached = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        const file: File = e.target.files[0];
        if (!file) {
            return; 
        } 
        dispatch(attachFile(file));
    };

    const onTextAttached = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!e.target.value) {
            return; 
        }
        if (mode === ConversionMode.To) {
            dispatch(attachText(e.target.value));
            return; 
        }
        dispatch(attachBase64(e.target.value));
    }; 

    const onNext = (mode: ConversionMode) => {
        if (mode === ConversionMode.To) {
            navigate('/encoded');
            return; 
        }
        navigate('/decoded');
    };

    const Encode = () => (
        <article>
            <div>
                <input type="file" accept=".pdf,.png,.xml" onChange={onFileAttached}/>
                <textarea name="input" cols={30} rows={10} onChange={onTextAttached} />
            </div>
            <aside>
                <p>Attach a file or paste your text you'd like to encode</p>
            </aside>
            <button onClick={() => onNext(ConversionMode.To)}>Encode</button>
        </article>
    ); 

    const Decode = () => (
        <article>
            <textarea name="input" cols={30} rows={10} onChange={onTextAttached} />
            <aside>
                <p>Paste your base64 string and hit decode!</p>
            </aside>
            <button onClick={() => onNext(ConversionMode.From)}>Decode</button>
        </article>
    ); 

    return (
        <section about="convrtify decode or encode" id="start">
            <header>
                <h1>Convert Your File</h1>
                <h3>Fast. Simple. Secure</h3>
            </header>
            <div>
                <h2>Choose conversion method</h2>
                <button onClick={() => setMode(ConversionMode.To)}>To Base64</button>
                <button onClick={() => setMode(ConversionMode.From)}>From Base64</button>
            </div>
            { mode === ConversionMode.To ? <Encode /> : <Decode /> }
        </section>
    );
}