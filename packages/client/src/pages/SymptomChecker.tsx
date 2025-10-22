import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface DiseaseResponse {
    predicted_disease: string;
    confidence: string;
    valid_symptoms_count: number;
    total_symptoms_entered: number;
    description: string;
    precautions: string[];
    medications: string[];
    recommended_diet: string[];
    workout_recommendations: string[];
}

export default function SymptomChecker() {
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [disease, setDisease] = useState<DiseaseResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch all symptoms
    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const { data } = await axios.get<any>(
                    'https://yassuke-test-2-using-typescript.hf.space/api/symptoms'
                );
                // Assume the API returns { available_symptoms: string[] }
                const list: string[] = data?.available_symptoms || [];
                setSymptoms(list.sort((a, b) => a.localeCompare(b)));
            } catch (err) {
                console.error(err);
                setError('Failed to load symptoms. Please try again.');
            }
        };
        fetchSymptoms();
    }, []);

    const addSymptom = (symptom: string) => {
        setSelectedSymptoms(prev => [...prev, symptom]);
    };

    const removeSymptom = (symptom: string) => {
        setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
    };

    const handleSubmit = async () => {
        if (selectedSymptoms.length < 4) {
            setError('Please select at least 4 symptoms before submitting.');
            setDisease(null);
            return;
        }
        setLoading(true);
        setError(null);
        setDisease(null);

        try {
            const payload = { symptoms: selectedSymptoms };
            const { data } = await axios.post<DiseaseResponse>(
                'https://yassuke-test-2-using-typescript.hf.space/api',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (!data || !data.predicted_disease) {
                setError(
                    'No disease found for the given symptoms. Please try different symptoms.'
                );
                setDisease(null);
                return;
            }
            setDisease(data);
        } catch (err) {
            console.error(err);
            setError('Something went wrong while checking symptoms.');
        } finally {
            setLoading(false);
        }
    };

    // Filter and sort available symptoms
    const availableSymptoms = symptoms
        .filter(s => !selectedSymptoms.includes(s))
        .filter(s => s.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.localeCompare(b));

    return (
        <div className="max-w-2xl mx-auto mt-18 p-6 rounded-xl shadow-md bg-gray-800 text-gray-300">
            <h1 className="text-2xl font-bold mb-4 text-center">
                🩺 Symptom Checker
            </h1>

            {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

            {/* Selected symptoms chips */}
            {selectedSymptoms.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSymptoms.map(symptom => (
                        <div
                            key={symptom}
                            className="bg-indigo-800 text-white px-3 py-1 rounded-full flex items-center space-x-2"
                        >
                            <span>
                                {symptom
                                    .split('_')
                                    .map(
                                        word =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(' ')}
                            </span>
                            <button
                                onClick={() => removeSymptom(symptom)}
                                className="font-bold text-red-500 hover:text-red-700 cursor-pointer"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => setSelectedSymptoms([])}
                        className="ml-2 px-3 py-1 rounded-full bg-red-800 text-white hover:bg-red-900"
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Search input */}
            <input
                type="text"
                placeholder="Search symptoms..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full p-2 mb-3 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-700"
            />

            {/* Symptoms list */}
            <div className="max-h-64 overflow-y-auto border-1 border-gray-600 rounded-md p-3">
                {availableSymptoms.length === 0 ? (
                    <p className="text-gray-400">No symptoms found.</p>
                ) : (
                    <ul className="space-y-2">
                        {availableSymptoms.map(symptom => (
                            <li key={symptom}>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedSymptoms.includes(
                                            symptom
                                        )}
                                        onChange={() => addSymptom(symptom)}
                                        className="bg-gray-700"
                                    />
                                    <span>
                                        {symptom
                                            .split('_')
                                            .map(
                                                word =>
                                                    word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    word.slice(1)
                                            )
                                            .join(' ')}
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Submit button */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-4 w-full py-2 rounded-lg text-white font-semibold ${
                    loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
                {loading ? 'Checking...' : 'Check Disease'}
            </button>

            {/* Disease result */}
            {disease && (
                <div className="mt-5 p-5 rounded-xl bg-gray-900 text-gray-300 shadow-sm">
                    <Collapsible>
                        <CollapsibleTrigger>
                            <h2 className="text-2xl font-bold text-green-700 mb-2">
                                🩺 {disease.predicted_disease}
                            </h2>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <p className="mb-2">
                                <strong>Confidence:</strong>
                                {disease.confidence}
                            </p>
                            <p className="mb-3">{disease.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold text-green-700 mb-1">
                                        ⚕️ Precautions
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {disease.precautions.map(p => (
                                            <li key={p}>{p}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-green-700 mb-1">
                                        💊 Medications
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {disease.medications.map(m => (
                                            <li key={m}>{m}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-green-700 mb-1">
                                        🥗 Recommended Diet
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {disease.recommended_diet.map(d => (
                                            <li key={d}>{d}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-green-700 mb-1">
                                        🏋️‍♀️ Workout Recommendations
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {disease.workout_recommendations.map(
                                            w => (
                                                <li key={w}>{w}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <p className="mt-4 text-sm text-gray-600">
                                <strong>Valid Symptoms:</strong>{' '}
                                {disease.valid_symptoms_count} /{' '}
                                {disease.total_symptoms_entered}
                            </p>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            )}
        </div>
    );
}
