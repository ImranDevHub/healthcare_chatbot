import { Elysia, t } from 'elysia';
import { SuggestionService } from '../services/suggestionService';

const userProfileSchema = t.Object({
    age: t.Number(),
    gender: t.Optional(
        t.Union([t.Literal('male'), t.Literal('female'), t.Literal('other')])
    ),
    activity: t.Union([
        t.Literal('low'),
        t.Literal('moderate'),
        t.Literal('high'),
    ]),
    goal: t.Union([
        t.Literal('lose'),
        t.Literal('maintain'),
        t.Literal('gain'),
    ]),
    diet: t.Optional(
        t.Union([
            t.Literal('normal'),
            t.Literal('vegan'),
            t.Literal('vegetarian'),
            t.Literal('halal'),
            t.Literal('high-sugar'),
            t.Literal('low-carb'),
        ])
    ),
    sleepHours: t.Optional(t.Number()),
    conditions: t.Optional(t.Array(t.String())),
    concern: t.String(), // REQUIRED user input describing what they want to improve
});

export const suggestions = new Elysia({ prefix: '/api/suggestions' }).post(
    '/',
    async ({ body }) => {
        const service = new SuggestionService();
        return await service.getSuggestions(body);
    },
    { body: userProfileSchema }
);
