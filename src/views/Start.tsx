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
    const [mode, setMode] = useState<ConversionMode>(ConversionMode.Encode);

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
                <label htmlFor="upload">Select file</label>
                <input type="file" id="upload" accept=".pdf,.png,.xml" onChange={onFileAttached} />
                <em>or paste text</em>
                <textarea name="input" cols={30} rows={10} onChange={onTextAttached} placeholder="Enter text and hit encode!" />
            </div>
            <button onClick={() => onNext(ConversionMode.Encode)}>Encode</button>
        </article>
    );

    const Decode = () => (
        <article>
            <textarea name="input" cols={30} rows={10} onChange={onTextAttached} placeholder="Paste your base64 string and hit decode!" />
            <button onClick={() => onNext(ConversionMode.Decode)}>Decode</button>
        </article>
    );

    const RenderMode = () => {
        if (mode === ConversionMode.Encode) {
            return <Encode />;
        }
        if (mode === ConversionMode.Decode) {
            return <Decode />;
        }
        return null;
    }

    return (
        <main>
            <nav>
                <h1>Convrtify</h1>
                <ul>
                    <li onClick={() => setMode(ConversionMode.Encode)}>Encode</li>
                    <li onClick={() => setMode(ConversionMode.Decode)}>Decode</li>
                </ul>
            </nav>
            <section>
                <RenderMode />
            </section>
        </main>
    );
}