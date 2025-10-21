import OpenAI from 'openai';
import { generateHealthPrompt } from '../prompts/healthPrompts';
import type { UserProfile } from '../types/health';

export class SuggestionService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY,
            defaultHeaders: {
                'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
                'X-Title': process.env.SITE_TITLE || 'Health App',
            },
        });
    }

    async getSuggestions(
        profile: UserProfile
    ): Promise<{ suggestionsText: string; disclaimer: string }> {
        const prompt = generateHealthPrompt(profile);

        try {
            // Use a free-tier model (GPT-3.5) to avoid 402 payment error
            const completion = await this.openai.chat.completions.create({
                model: 'deepseek/deepseek-chat-v3.1:free', // free tier
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                // Ask model to return JSON array
                temperature: 0.7,
                max_tokens: 600,
            });

            const content = completion.choices?.[0]?.message?.content?.trim();

            if (!content) {
                throw new Error('Empty response from OpenRouter');
            }

            // Try to parse JSON output first
            let suggestionsText = '';
            let disclaimer = '';
            try {
                const json = JSON.parse(content);
                suggestionsText = JSON.stringify(json.suggestions, null, 2);
                disclaimer = json.disclaimer || 'No disclaimer provided.';
            } catch {
                // If JSON parsing fails, fallback: split text by "Disclaimer:"
                const parts = content.split('Disclaimer:');
                suggestionsText = parts[0]?.trim() || '';
                disclaimer = parts[1]?.trim() || 'No disclaimer provided.';
            }

            return {
                suggestionsText,
                disclaimer: `Disclaimer: ${disclaimer}`,
            };
        } catch (error) {
            console.error('Failed to get suggestions from OpenRouter:', error);
            throw new Error('Could not retrieve suggestions at this time.');
        }
    }
}
