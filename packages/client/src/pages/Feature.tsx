import img_feature_2 from '../assets/images/feature-2.1.jpg';
import img_feature_3 from '../assets/images/feature-3.1.jpg';
import {
    FingerPrintIcon,
    QuestionMarkCircleIcon,
    LanguageIcon,
    AcademicCapIcon,
    LightBulbIcon,
    BookOpenIcon,
    CheckCircleIcon,
    CalendarDaysIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    ClockIcon,
    FaceSmileIcon,
} from '@heroicons/react/24/outline';

const features_1 = [
    {
        name: 'Instant Symptom Checks',
        description:
            'Describe what you’re feeling, and get a simplified explanation of possible causes, helping you understand your body better before the doctor’s visit.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Trusted Medical Knowledge',
        description:
            'Built on verified health data and reviewed sources, so you’re always receiving information you can rely on — not random internet myths.',
        icon: ChartBarIcon,
    },
    {
        name: 'Available 24/7',
        description:
            'Whether it’s late at night or early in the morning, your assistant is always ready to listen and respond without delay.',
        icon: ClockIcon,
    },
    {
        name: 'Stress-Free Experience',
        description:
            'No complex interfaces, no overwhelming content — just clear answers in friendly, conversational language.',
        icon: FaceSmileIcon,
    },
];
const features_2 = [
    {
        name: 'Ask Anything, Anytime',
        description:
            'From headaches to nutrition advice — just type your concern and receive clear, science-backed explanations in seconds. No jargon, no confusion.',
        icon: QuestionMarkCircleIcon,
    },
    {
        name: 'Learn as You Go',
        description:
            'Every answer is crafted to educate, helping you build real health knowledge instead of quick guesses from the internet.',
        icon: AcademicCapIcon,
    },
    {
        name: 'Personalized Suggestions',
        description:
            'Get lifestyle tips, self-care guidance, and next-step recommendations tailored to your input — not generic search results.',
        icon: LightBulbIcon,
    },
    {
        name: 'Safe and Reliable Information',
        description:
            'Powered by trusted medical sources and continuously improving through supervised AI learning.',
        icon: FingerPrintIcon,
    },
];
const features_3 = [
    {
        name: 'Explore Verified Health Topics',
        description:
            'Browse condition summaries, treatment explanations, wellness tips, and more — all written in clear, human language.',
        icon: CheckCircleIcon,
    },
    {
        name: 'Perfect for Students & Self-Learners',
        description:
            'Whether you’re studying medicine or just curious about how your body works, our AI adapts to your learning pace.',
        icon: LanguageIcon,
    },
    {
        name: 'No Overwhelm. No Guesswork.',
        description:
            'Forget long research papers and confusing articles — get straight-to-the-point insights in seconds.',
        icon: BookOpenIcon,
    },
    {
        name: 'Always Up-to-Date',
        description:
            'Continuously refined with the latest healthcare research and trusted medical guidelines.',
        icon: CalendarDaysIcon,
    },
];

export default function FeatureSection() {
    return (
        <section>
            <section className="bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base/7 font-semibold text-indigo-400">
                            Get Answers Faster
                        </h2>
                        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
                            Your AI Assistant for Everyday Health Questions
                        </p>
                        <p className="mt-6 text-lg/8 text-gray-300">
                            No more guessing or endless scrolling through
                            confusing articles. Our intelligent assistant makes
                            healthcare information accessible, clear, and
                            instant — all in one place.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features_1.map(feature => (
                                <div
                                    key={feature.name}
                                    className="relative pl-16"
                                >
                                    <dt className="text-base/7 font-semibold text-white">
                                        <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
                                            <feature.icon
                                                aria-hidden="true"
                                                className="size-6 text-white"
                                            />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base/7 text-gray-400">
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>
            <section className="overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pt-4 lg:pr-8">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base/7 font-semibold text-indigo-400">
                                    Know More. Worry Less.
                                </h2>
                                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                                    A Smarter Way to Understand Your Health
                                </p>
                                <p className="mt-6 text-lg/8 text-gray-300">
                                    Your health shouldn’t be a mystery. Our AI
                                    assistant gives you instant clarity —
                                    whether you’re checking symptoms, learning
                                    about a condition, or simply staying
                                    informed. Designed for patients, students,
                                    and everyday learners alike.
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
                                    {features_2.map(feature => (
                                        <div
                                            key={feature.name}
                                            className="relative pl-9"
                                        >
                                            <dt className="inline font-semibold text-white">
                                                <feature.icon
                                                    aria-hidden="true"
                                                    className="absolute top-1 left-1 size-5 text-indigo-400"
                                                />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">
                                                {feature.description}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <img
                            alt="Product screenshot"
                            src={img_feature_2}
                            width={1200}
                            height={680}
                            className="rounded-xl shadow-xl ring-1 ring-white/10 self-center"
                        />
                    </div>
                </div>
            </section>
            <section className="overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pt-4 lg:pr-8 lg:order-2">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base/7 font-semibold text-indigo-400">
                                    Stay Informed. Stay Prepared.
                                </h2>
                                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                                    Your Personal Health Library — Powered by AI
                                </p>
                                <p className="mt-6 text-lg/8 text-gray-300">
                                    Never search across dozens of sites again.
                                    Our platform organizes complex medical
                                    knowledge into simple, easy-to-digest
                                    answers — tailored to your level of
                                    understanding.
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
                                    {features_3.map(feature => (
                                        <div
                                            key={feature.name}
                                            className="relative pl-9"
                                        >
                                            <dt className="inline font-semibold text-white">
                                                <feature.icon
                                                    aria-hidden="true"
                                                    className="absolute top-1 left-1 size-5 text-indigo-400"
                                                />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">
                                                {feature.description}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <img
                            alt="Product screenshot"
                            src={img_feature_3}
                            width={1200}
                            height={680}
                            className="rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:order-1 self-center"
                        />
                    </div>
                </div>
            </section>
        </section>
    );
}
