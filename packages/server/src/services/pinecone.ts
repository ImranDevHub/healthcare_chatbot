import { Pinecone } from '@pinecone-database/pinecone';
import { generateEmbedding, generateEmbeddings } from './embeddings';

let pineconeClient: Pinecone | null = null;

/**
 * Initializes and returns a Pinecone client.
 * @returns A promise that resolves to the Pinecone client.
 */
export async function getPineconeClient(): Promise<Pinecone> {
    if (!pineconeClient) {
        const apiKey = process.env.PINECONE_API_KEY;
        if (!apiKey) {
            throw new Error(
                'PINECONE_API_KEY is not set in the environment variables.'
            );
        }
        pineconeClient = new Pinecone({ apiKey });
    }
    return pineconeClient;
}

/**
 * Creates a Pinecone index if it doesn't already exist.
 * @param client The Pinecone client.
 * @param indexName The name of the index to create.
 * @param dimension The dimension of the vectors.
 */
export async function createPineconeIndex(
    client: Pinecone,
    indexName: string,
    dimension: number
) {
    const existingIndexes = await client.listIndexes();
    if (!existingIndexes.indexes?.some((index) => index.name === indexName)) {
        await client.createIndex({
            name: indexName,
            dimension: dimension,
            metric: 'cosine',
            spec: {
                serverless: {
                    cloud: 'aws',
                    region: 'us-east-1',
                },
            },
        });
        console.log(`Index "${indexName}" created successfully.`);
    } else {
        console.log(`Index "${indexName}" already exists.`);
    }
}

/**
 * Upserts text chunks and their embeddings into a Pinecone index.
 * @param client The Pinecone client.
 * @param indexName The name of the index.
 * @param chunks The text chunks to upsert.
 */
export async function upsertToPinecone(
    client: Pinecone,
    indexName: string,
    chunks: string[]
) {
    const index = client.index(indexName);
    const batchSize = 100;

    for (let i = 0; i < chunks.length; i += batchSize) {
        const batch = chunks.slice(i, i + batchSize);
        const embeddings = await generateEmbeddings(batch);

        const vectors = embeddings.map((embedding, j) => ({
            id: `vec${i + j}`,
            values: embedding,
            metadata: { text: batch[j] || '' },
        }));

        await index.upsert(vectors);
        console.log(
            `Upserted batch ${i / batchSize + 1}/${Math.ceil(chunks.length / batchSize)}`
        );
    }
}

/**
 * Queries the Pinecone index to find the most relevant context for a given query.
 * @param client The Pinecone client.
 * @param indexName The name of the index.
 * @param query The user's query.
 * @returns A promise that resolves to the retrieved context.
 */
export async function queryPinecone(
    client: Pinecone,
    indexName: string,
    query: string
): Promise<string | null> {
    const index = client.index(indexName);
    const queryEmbedding = await generateEmbedding(query);

    const results = await index.query({
        vector: queryEmbedding,
        topK: 2,
        includeMetadata: true,
    });

    const relevantMatches = results.matches?.filter(
        (match) => match.score && match.score > 0.5
    );

    if (relevantMatches && relevantMatches.length > 0) {
        return relevantMatches
            .map((match) => match.metadata?.text)
            .filter(Boolean)
            .join('\n');
    }

    return null;
}
