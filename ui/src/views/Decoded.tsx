import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setDecoded } from "../reducers/DecodeReducer";
import { RootState } from "../store";

export const DecodedView = () => {
    const dispatch: any = useDispatch();
    const base64 = useSelector((state: RootState) => state.decode.base64);
    const decoded = useSelector((state: RootState) => state.decode.response);
    useEffect(() => {
        if (base64) {
            dispatch(setDecoded(decodeURIComponent(escape(atob(base64)))))
        }
    }, []);


    const ViewAsBlob = () => {
        console.log(decoded);
        window.open(URL.createObjectURL(new Blob([decoded], {
            type: "application/pdf"
        })));
    }

    return (
        <section>
            <article>
                <header>
                    Your file has been decoded!
                </header>
                <div>
                    {decoded}
                    <button onClick={ViewAsBlob}>Download</button>
                </div>
                <footer>
                    <button>Home</button>
                </footer>
            </article>
        </section>
    )
}