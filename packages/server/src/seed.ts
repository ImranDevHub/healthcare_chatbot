import 'dotenv/config';
import path from 'path';
import { loadPdfText } from './services/pdfLoader';
import { splitTextIntoChunks } from './services/textSplitter';
import {
    getPineconeClient,
    createPineconeIndex,
    upsertToPinecone,
} from './services/pinecone';

// --- Constants ---
const PDF_PATH = path.join(import.meta.dir, '..', 'data', 'Medical_book.pdf');
const INDEX_NAME = 'medical-chatbot-1';
const EMBEDDING_DIMENSION = 384; // Based on the 'all-MiniLM-L6-v2' model
const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 20;

async function seed() {
    console.log('--- Starting Seeding Process ---');

    // 1. Load and process the PDF
    console.log('Loading PDF...');
    const pdfText = await loadPdfText(PDF_PATH);
    const textChunks = splitTextIntoChunks(pdfText, CHUNK_SIZE, CHUNK_OVERLAP);
    console.log(`PDF processed into ${textChunks.length} chunks.`);

    // 2. Initialize Pinecone and create the index
    console.log('Initializing Pinecone...');
    const pineconeClient = await getPineconeClient();
    await createPineconeIndex(pineconeClient, INDEX_NAME, EMBEDDING_DIMENSION);

    // 3. Upsert the document chunks to Pinecone
    console.log('Upserting chunks to Pinecone...');
    await upsertToPinecone(pineconeClient, INDEX_NAME, textChunks);

    console.log('--- Seeding Complete ---');
}

seed().catch((error) => {
    console.error('An error occurred during seeding:', error);
});
