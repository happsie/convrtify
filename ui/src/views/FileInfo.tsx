import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ALLOWED_TYPES, FileFormat } from "../models/FileFormat";
import { setExportOptions } from "../reducers/FileReducer";
import { RootState } from "../store";

export const FileInfoView = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const file = useSelector((state: RootState) => state.file.file);
    const base64 = useSelector((state: RootState) => state.file.base64);
    const [filename, setFilename] = useState<string>(''); 
    const [fileFormat, setFileFormat] = useState<FileFormat>(ALLOWED_TYPES[0]); 
    useEffect(() => {
        if (!file && !base64) {
            navigate('/')
            return; 
        }
        if (file) {
            setFilename(file.name.replace(/..{3}$/g, '')); 
        }
    }, [file, base64]); 

    const onSelect = (e: any) => {
        e.preventDefault();
        const fileFormat = ALLOWED_TYPES.find(fileFormat => fileFormat.mime === e.target.value);
        if (!fileFormat) {
            return; 
        }
        setFileFormat(fileFormat); 
        console.log(fileFormat);
    }

    const onChangeOutputName = (e: any) => {
        e.preventDefault(); 
        setFilename(e.target.value); 
    }

    const onClick = () => {
        dispatch(setExportOptions({
            mime: fileFormat.mime,
            name: filename
        }));
        navigate('/download');
    }

    return (
        <section about="file-info">
            <header>
                <h1>Output settings</h1>
            </header>
            <h3>File type</h3>
            <select name="formats" id="formats" onChange={onSelect}>
                {ALLOWED_TYPES.map(type => <option value={type.mime} key={type.mime}>{type.title}</option>)}
            </select>
            <h3>Modify output name</h3>
            <input type="text" value={filename} onChange={onChangeOutputName} />
            <button onClick={onClick}>Convert</button>
        </section>
    )
}