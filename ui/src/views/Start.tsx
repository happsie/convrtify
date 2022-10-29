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
        if (mode === ConversionMode.Encode) {
            dispatch(attachText(e.target.value));
            return; 
        }
        dispatch(attachBase64(e.target.value));
    }; 

    const onNext = (mode: ConversionMode) => {
        if (mode === ConversionMode.Encode) {
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
            <button onClick={() => onNext(ConversionMode.Encode)}>Encode</button>
        </article>
    ); 

    const Decode = () => (
        <article>
            <textarea name="input" cols={30} rows={10} onChange={onTextAttached} />
            <aside>
                <p>Paste your base64 string and hit decode!</p>
            </aside>
            <button onClick={() => onNext(ConversionMode.Decode)}>Decode</button>
        </article>
    ); 

    const RenderMode = () => {
        if (mode === ConversionMode.None) {
            return null; 
        }
        if (mode === ConversionMode.Encode) {
            return <Encode />;
        }
        if (mode === ConversionMode.Decode) {
            return <Decode />;
        }
        return null;
    }

    return (
        <section about="convrtify decode or encode" id="start">
            <header>
                <h1>Convrtify</h1>
                <hr />
                <p>Base64 encoder/decoder</p>
                <em>Fast - Simple - Secure</em>
            </header>
            <div id="conversion-mode">
                <h2>Choose conversion method</h2>
                <div>
                    <button onClick={() => setMode(ConversionMode.Encode)}>Encode</button>
                    <button onClick={() => setMode(ConversionMode.Decode)}>Decode</button>
                </div>
            </div>
            <RenderMode />
        </section>
    );
}