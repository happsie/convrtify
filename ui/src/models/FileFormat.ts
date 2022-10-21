export type FileFormat = {
    mime: string;
    title: string; 
}

export const ALLOWED_TYPES: FileFormat[] = [
    {
        mime: "image/png", 
        title: "PNG" 
    }, 
    {
        mime: "application/pdf", 
        title: "PDF" 
    }, 
    {
        mime: "text/plain", 
        title: "Base64" 
    }
];
