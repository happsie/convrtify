import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ALLOWED_TYPES } from "../models/FileFormat";
import { RootState } from "../store";

export const FileInfo = () => {
    const file = useSelector((state: RootState) => state.file);
    useEffect(() => {
        console.log(file);
    }, [file]);

    const onSelect = (e) => {
        console.log(e.target.value);
    }

    return (
        <section about="file-info">
            <header>
                <h1>Output settings</h1>
            </header>
            <select name="formats" id="formats" onChange={onSelect}>
                {ALLOWED_TYPES.map(type => <option value={type.mime} key={type.mime}>{type.title}</option>)}
            </select>
        </section>
    )
}