import fs from 'fs';
import path from 'path';
import ollama from 'ollama';
import template from '../prompts/chatbot.txt';

const medicalInfo = fs.readFileSync(
    path.join(__dirname, '..', 'prompts', 'medical_knowledge_base.md'),
    'utf-8'
);

const instruction = template.replace('{{MEDICAL_INFO}}', medicalInfo);

export async function getLlamaAnswer(
    context: string,
    question: string
): Promise<string> {
    const prompt = `You are a medical expert assistant. Use ONLY the following context to answer the user's question. Do not use any external knowledge. If the context does not contain the answer, you MUST say "I don’t have enough medical data to answer that."\n\nContext: ${context}\n\nQuestion: ${question}\n\nAnswer: `;

    try {
        const response = await ollama.chat({
            model: 'hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:Q4_K_M', // <-- IMPORTANT: Replace this with a model name from your `ollama list`
            messages: [
                { role: 'system', content: instruction },
                { role: 'user', content: prompt },
            ],
        });

        if (response.message.content) {
            return response.message.content.trim();
        }

        throw new Error('Invalid response format from Ollama.');
    } catch (error) {
        console.error('Error calling Ollama:', error);
        throw new Error('Failed to get a response from the Ollama model.');
    }
}

/**
 * Calls the Ollama model directly for general knowledge questions.
 * @param question The user's question.
 * @returns A promise that resolves to the model's answer.
 */
export async function callOllamaDirectly(question: string): Promise<string> {
    try {
        const response = await ollama.chat({
            model: 'hf.co/bartowski/Llama-3.2-3B-Instruct-GGUF:Q4_K_M',
            messages: [
                { role: 'system', content: instruction },
                { role: 'user', content: question },
            ],
            options: {
                num_predict: 100, // Limits how long the response is → faster
            },
        });

        if (response.message.content) {
            return response.message.content.trim();
        }

        throw new Error('Invalid response format from Ollama.');
    } catch (error) {
        console.error('Error calling Ollama directly:', error);
        throw new Error('Failed to get a response from the Ollama model.');
    }
}
