export type UserProfile = {
    age: number;
    gender?: 'male' | 'female' | 'other';
    activity: 'low' | 'moderate' | 'high';
    goal: 'lose' | 'maintain' | 'gain';
    diet?:
        | 'normal'
        | 'vegan'
        | 'vegetarian'
        | 'halal'
        | 'high-sugar'
        | 'low-carb';
    sleepHours?: number;
    conditions?: string[];
};

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
