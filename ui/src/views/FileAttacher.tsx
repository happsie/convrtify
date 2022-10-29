import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ConversionMode } from "../models/FileFormat";
import { attachFile, attachText, Mime, reset } from "../reducers/EncodeReducer";
import { RootState } from "../store";

export const StartView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mode, setMode] = useState<ConversionMode>(ConversionMode.None);
  
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
        dispatch(attachText(e.target.value));
    }; 

    const onNext = (mode: ConversionMode) => {
        if (mode === ConversionMode.To) {
            navigate('/download');
            return; 
        }
    };

    const ModeSelection = () => (
        <React.Fragment>
            <h2>Choose conversion method</h2>
            <button onClick={() => setMode(ConversionMode.To)}>To Base64</button>
            <button onClick={() => setMode(ConversionMode.From)}>From Base64</button>
        </React.Fragment>
    );
    const Encode = () => (
        <article>
            <div>
                <input type="file" accept=".pdf,.png,.xml" onChange={onFileAttached}/>
                <textarea name="base64" cols={30} rows={10} onChange={onTextAttached} />
            </div>
            <aside>
                <p>Attach a file or paste your text you'd like to encode</p>
                <em>Supported file formats are pdf, jpg and xml</em>
            </aside>
            <button onClick={() => onNext(ConversionMode.To)}>Encode</button>
        </article>
    ); 

    const Decode = () => (
        <React.Fragment>
            
        </React.Fragment>
    ); 

    return (
        <section about="file-upload">
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