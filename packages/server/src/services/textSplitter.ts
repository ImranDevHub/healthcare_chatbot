/**
 * Splits a long text into smaller chunks of a specified size with overlap.
 * @param text The text to split.
 * @param chunkSize The maximum size of each chunk (in characters).
 * @param chunkOverlap The number of characters to overlap between chunks.
 * @returns An array of text chunks.
 */
export function splitTextIntoChunks(
    text: string,
    chunkSize: number,
    chunkOverlap: number
): string[] {
    if (chunkOverlap >= chunkSize) {
        throw new Error('chunkOverlap must be smaller than chunkSize.');
    }

    const chunks: string[] = [];
    let i = 0;

    while (i < text.length) {
        const end = i + chunkSize;
        chunks.push(text.slice(i, end));
        i += chunkSize - chunkOverlap;
    }

    return chunks;
}
