import React, { useState } from 'react';
import axios from 'axios';
import type { Suggestion } from '../types/health';

const HealthForm: React.FC = () => {
    const [formData, setFormData] = useState({
        age: '30',
        gender: 'male' as 'male' | 'female' | 'other',
        activity: 'moderate' as 'low' | 'moderate' | 'high',
        goal: 'maintain' as 'lose' | 'maintain' | 'gain',
        diet: '',
        sleepHours: '',
        conditions: '',
        concern: '',
    });

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [disclaimer, setDisclaimer] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.concern.trim()) {
            setError('Please describe what you want to improve.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuggestions([]);
        setDisclaimer('');

        try {
            // Backend now returns plain text in suggestionsText
            const response = await axios.post<{
                suggestionsText: string;
                disclaimer: string;
            }>('/api/suggestions', {
                age: Number(formData.age),
                gender: formData.gender || undefined,
                activity: formData.activity,
                goal: formData.goal,
                diet: formData.diet || undefined,
                sleepHours: formData.sleepHours
                    ? Number(formData.sleepHours)
                    : undefined,
                conditions: formData.conditions
                    ? formData.conditions.split(',').map(c => c.trim())
                    : undefined,
                concern: formData.concern,
            });

            const lines = response.data.suggestionsText
                .split('\n')
                .filter(line => line.trim() !== '');

            const parsedSuggestions = lines.map((line, idx) => ({
                id: idx.toString(),
                title: line.split(':')[0] || 'Health Tip',
                details: line.split(':')[1]?.trim() || line,
                category: 'wellness',
            }));

            setSuggestions(parsedSuggestions);
            setDisclaimer(response.data.disclaimer);
        } catch (err) {
            setError('Failed to fetch suggestions. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-300 mb-6 text-center">
                    Personalized Health Suggestions
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* AGE & GENDER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="age"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                id="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Gender
                            </label>
                            <select
                                name="gender"
                                id="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* ACTIVITY & GOAL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="activity"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Activity Level
                            </label>
                            <select
                                name="activity"
                                id="activity"
                                value={formData.activity}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                            >
                                <option value="low">Low</option>
                                <option value="moderate">Moderate</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="goal"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Primary Goal
                            </label>
                            <select
                                name="goal"
                                id="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                            >
                                <option value="lose">Lose Weight</option>
                                <option value="maintain">
                                    Maintain Weight
                                </option>
                                <option value="gain">Gain Muscle/Weight</option>
                            </select>
                        </div>
                    </div>

                    {/* DIET & SLEEP */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="diet"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Diet (Optional)
                            </label>
                            <select
                                name="diet"
                                id="diet"
                                value={formData.diet}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                            >
                                <option value="">Select Diet</option>
                                <option value="normal">Normal</option>
                                <option value="vegan">Vegan</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="halal">Halal</option>
                                <option value="high-sugar">High-Sugar</option>
                                <option value="low-carb">Low-Carb</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="sleepHours"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Sleep Hours (Optional)
                            </label>
                            <input
                                type="number"
                                name="sleepHours"
                                id="sleepHours"
                                value={formData.sleepHours}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    {/* CONDITIONS */}
                    <div>
                        <label
                            htmlFor="conditions"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Existing Conditions (Optional, comma-separated)
                        </label>
                        <input
                            type="text"
                            name="conditions"
                            id="conditions"
                            value={formData.conditions}
                            onChange={handleChange}
                            placeholder="e.g., stress, high blood pressure"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* CONCERN */}
                    <div>
                        <label
                            htmlFor="concern"
                            className="block text-sm font-medium text-gray-700"
                        >
                            What do you want to improve?
                        </label>
                        <textarea
                            name="concern"
                            id="concern"
                            value={formData.concern}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                            placeholder="e.g., better sleep, more energy, muscle growth, stress relief"
                            required
                        />
                    </div>

                    {/* SUBMIT */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
                        >
                            {loading
                                ? 'Getting Suggestions...'
                                : 'Get Suggestions'}
                        </button>
                    </div>
                </form>

                {error && (
                    <p className="mt-6 text-center text-red-500 font-medium">
                        {error}
                    </p>
                )}

                {suggestions.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Your Suggestions
                        </h2>
                        <div className="space-y-4">
                            {suggestions.map(suggestion => (
                                <div
                                    key={suggestion.id}
                                    className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg"
                                >
                                    <h3 className="font-bold text-blue-900">
                                        {suggestion.title}
                                    </h3>
                                    <p className="text-gray-700">
                                        {suggestion.details}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {disclaimer && (
                            <p className="mt-4 text-sm text-gray-500 text-center">
                                {disclaimer}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthForm;
