import { Elysia, t } from 'elysia';
import fs from 'fs';
import OpenAI from 'openai';
import path from 'path';
import template from '../prompts/chatbot.txt';

// 1. Initialize OpenRouter Client
const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY!,
    defaultHeaders: {
        'HTTP-Referer': process.env.SITE_URL!,
        'X-Title': process.env.SITE_TITLE!,
    },
});

// 2. Load and Prepare Prompts
const MEDICAL_INFO = fs.readFileSync(
    path.join(path.dirname(__dirname), 'prompts', 'medical_knowledge_base.md'),
    'utf-8'
);

// This is a placeholder. In a real app, you'd get this from the user's session or a database.
const instruction = template.replace('{{MEDICAL_INFO}}', MEDICAL_INFO);

// 3. Define the Chat Route
export const chatRoutes = new Elysia({ prefix: '/api/chat' }).post(
    '/',
    async ({ body, set }) => {
        const { question } = body;

        if (!question || typeof question !== 'string') {
            set.status = 400;
            return { error: 'Question is required and must be a string.' };
        }

        try {
            console.log('[API] Sending request to OpenRouter...');
            const completion = await openai.chat.completions.create({
                model: 'google/gemini-2.0-flash-exp:free',
                messages: [
                    { role: 'system', content: instruction },
                    { role: 'user', content: question },
                ],
            });

            const answer = completion.choices[0]?.message?.content;
            console.log('[API] Received response from OpenRouter.');

            if (!answer) {
                set.status = 500;
                return { error: 'Failed to get a response from the model.' };
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
            conversationId: t.String(), // Kept for compatibility
        }),
    }
);
