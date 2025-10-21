export type Suggestion = {
    id: string;
    title: string;
    details: string;
    category:
        | 'nutrition'
        | 'exercise'
        | 'sleep'
        | 'hydration'
        | 'wellness'
        | 'warning';
};

export type HealthSuggestionResponse = {
    disclaimer: string;
    suggestions: Suggestion[];
};
