// A singleton class to ensure we only initialize the model once.
class EmbeddingPipeline {
    static task = 'feature-extraction';
    static model = 'sentence-transformers/all-MiniLM-L6-v2';
    static instance: any = null;

    static async getInstance() {
        if (this.instance === null) {
            const { pipeline, env } = await import('@huggingface/transformers');
            env.allowLocalModels = false;
            this.instance = pipeline(this.task as any, this.model);
        }
        return this.instance;
    }
}

/**
 * Generates embeddings for a given text using a pre-trained model.
 * @param text The text to generate embeddings for.
 * @returns A promise that resolves to the embedding vector.
 */
/**
 * Generates embeddings for an array of texts using a pre-trained model.
 * @param texts The array of texts to generate embeddings for.
 * @returns A promise that resolves to an array of embedding vectors.
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
    const extractor = await EmbeddingPipeline.getInstance();
    const results = await extractor(texts, {
        pooling: 'mean',
        normalize: true,
    });
    return results.tolist();
}

/**
 * Generates embeddings for a given text using a pre-trained model.
 * @param text The text to generate embeddings for.
 * @returns A promise that resolves to the embedding vector.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    const embeddings = await generateEmbeddings([text]);
    if (!embeddings[0]) {
        throw new Error('Failed to generate embedding for the given text.');
    }
    return embeddings[0];
}
