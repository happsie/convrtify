import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ALLOWED_TYPES } from "../models/FileFormat";
import { attachBase64, attachFile } from "../reducers/FileReducer";

export const FileAttacherView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [base64, setBase64] = useState(''); 

    const onChange = (e: any) => {
        e.preventDefault();
        if (!e.target.files || e.target.files.length === 0) {
            e.target.value = null;
            return;
        }
        const file = e.target.files[0];
        const allowedMimes = ALLOWED_TYPES.map(type => type.mime); 
        if (!allowedMimes.includes(file.type)) {
            e.target.value = null;
            return;
        }
        dispatch(attachFile(file));
        toast('File connected successfully', { type: 'info' });
        navigate('/info');
    }

    const onChangeText = (e: any) => {
        e.preventDefault(); 
        setBase64(e.target.value); 
    }; 

    const go = () => {
        if (!base64) {
            toast('Could not get base64 value', { type: 'error' }); 
        }
        dispatch(attachBase64(base64)); 
        toast('Base64 attached successfully!', { type: 'info' });
        navigate('/info');
    }

    return (
        <section about="file-upload">
            <header>
                <h1>Convert Your File</h1>
                <h3>Fast. Simple. Secure</h3>
            </header>
            <p>Select file</p>
            <input type="file" onChange={onChange} />
            <p>Or paste base64</p>
            <input type="text" onChange={onChangeText} />
            <button onClick={go}>convert</button>
        </section>
    )
}