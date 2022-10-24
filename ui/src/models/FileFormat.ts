export type ExportOptions = {
    mime: string; 
    name: string; 
}

export type ExportResult = {
    status: 'loading' | 'success' | 'error';
    response?: any; 
    type?: ExportType; 
}

export enum ExportType {
    Base64 = 'base64',
    PNG = 'PNG',
    XML = 'XML'
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
