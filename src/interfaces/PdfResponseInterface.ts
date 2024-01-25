export interface PdfResponse {
    files: Pdf[]
}


export interface Pdf {
    id: number,
    title: string,
    path: string,
}