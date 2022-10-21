import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ALLOWED_TYPES } from "../models/FileFormat";
import { attachFile } from "../reducers/FileReducer";

export const FileAttacherView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onAttached = (file: any) => {
        toast('File connected successfully', { type: 'info' });
        navigate('/info');
    }

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
        onAttached(file);
    }

    return (
        <section about="file-upload">
            <header>
                <h1>Convert Your File</h1>
                <h3>Fast. Simple. Secure</h3>
            </header>
            <input type="file" onChange={onChange} />
        </section>
    )
}