import fs from 'fs/promises';
import {
    getDocument,
    GlobalWorkerOptions,
} from 'pdfjs-dist/legacy/build/pdf.mjs';

// Set up the worker source for pdfjs-dist. This is required for it to work in a Node.js environment.
// We point it to the pre-built legacy worker script that comes with the package.
GlobalWorkerOptions.workerSrc = 'pdfjs-dist/legacy/build/pdf.worker.mjs';

/**
 * Extracts text content from a PDF file using pdfjs-dist.
 * @param filePath The path to the PDF file.
 * @returns A promise that resolves to the extracted text.
 */
export async function loadPdfText(filePath: string): Promise<string> {
    try {
        const dataBuffer = await fs.readFile(filePath);
        const pdf = await getDocument({ data: new Uint8Array(dataBuffer) })
            .promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item) => ('str' in item ? item.str : ''))
                .join(' ');
            fullText += pageText + '\n';
        }

        return fullText;
    } catch (error) {
        console.error('Error reading or parsing PDF with pdfjs-dist:', error);
        throw new Error('Failed to process PDF file.');
    }
}
