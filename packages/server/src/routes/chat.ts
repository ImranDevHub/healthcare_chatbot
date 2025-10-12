import { Elysia, t } from 'elysia';
import { getPineconeClient, queryPinecone } from '../services/pinecone';
import { getLlamaAnswer, callOllamaDirectly } from '../services/llama';

// --- Constants ---
const INDEX_NAME = 'medical-chatbot-1';
const MEDICAL_KEYWORDS = [
    'health',
    'medical',
    'condition',
    'disease',
    'symptom',
    'pain',
    'fever',
    'treatment',
    'therapy',
    'medicine',
    'drug',
    'diabetes',
    'cancer',
    'acne',
];

/**
 * Checks if a question is health-related based on keywords.
 */
function isHealthQuery(question: string): boolean {
    const lowerCaseQuestion = question.toLowerCase();
    return MEDICAL_KEYWORDS.some((keyword) =>
        lowerCaseQuestion.includes(keyword)
    );
}

export const chatRoutes = new Elysia({ prefix: '/api/chat' }).post(
    '/',
    async ({ body, set }) => {
        console.log('[API] Chat request received');
        console.log(body);
        const { question } = body;

        if (!question) {
            set.status = 400;
            return { error: 'Question is required' };
        }

        let answer: string;

        try {
            if (isHealthQuery(question)) {
                console.log('[API] Mode: HEALTH → Pinecone');
                const pineconeClient = await getPineconeClient();
                const context = await queryPinecone(
                    pineconeClient,
                    INDEX_NAME,
                    question
                );

                if (context) {
                    answer = await getLlamaAnswer(context, question);
                } else {
                    answer = 'I don’t have enough medical data to answer that.';
                }
            } else {
                console.log('[API] Mode: GENERAL → LLM');
                answer = await callOllamaDirectly(question);
            }

            return { answer };
        } catch (error) {
            console.error('[API] Error processing chat request:', error);
            set.status = 500;
            return { error: 'An internal server error occurred.' };
        }
    },
    {
        body: t.Object({
            question: t.String(),
        }),
    }
);
