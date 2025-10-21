import type { UserProfile } from '../types/health';

export const generateHealthPrompt = (profile: UserProfile) => {
    return `You are a health assistant. Based on the user input below, generate clear and concise health and wellness suggestions.
- Age: ${profile.age}
- Gender: ${profile.gender || 'N/A'}
- Activity Level: ${profile.activity}
- Goal: ${profile.goal}
- Diet: ${profile.diet || 'N/A'}
- Sleep Hours: ${profile.sleepHours || 'N/A'}
- Conditions: ${profile.conditions?.join(', ') || 'None'}
- Concern: ${profile.concern}

Provide 5 bullet-point suggestions.
After that, include a short disclaimer beginning with "Disclaimer:".`;
};
