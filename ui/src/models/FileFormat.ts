export type ExportOptions = {
    mime: string; 
    name: string; 
}

export type ExportResult = {
    status: 'loading' | 'success' | 'error';
    blob?: any;
}

export type FileFormat = {
    mime: string;
    title: string; 
    fileExtension: string;
}

export const ALLOWED_TYPES: FileFormat[] = [
    {
        mime: "image/png", 
        title: "PNG",
        fileExtension: '.png',
    }, 
    {
        mime: "application/pdf", 
        title: "PDF",
        fileExtension: '.pdf',
    }, 
    {
        mime: "text/plain", 
        title: "Base64",
        fileExtension: '.txt',
    }
];
