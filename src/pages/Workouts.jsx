    import { Zap, Search, SlidersHorizontal } from 'lucide-react';
    import WorkoutCard from '../components/workouts/WorkoutCard';

    // MOCK DATA - reemplazar con llamada axios a /api/workouts
    const mockWorkouts = [
    {
        id: 1,
        category: 'HIIT',
        intensity: 'EXTREME',
        title: 'METABOLIC BREAKDOWN',
        description: 'High-intensity interval training for maximum caloric burn',
        duration: 45,
        calories: 650,
        imageUrl: 'https://res.cloudinary.com/dutmn3xde/image/upload/v1776594314/category_hiit_wpndxv.jpg',
    },
    {
        id: 2,
        category: 'YOGA',
        intensity: 'MODERATE',
        title: 'POWER YOGA FLOW',
        description: 'Build strength and flexibility through dynamic sequences',
        duration: 60,
        calories: 380,
        imageUrl: 'https://res.cloudinary.com/dutmn3xde/image/upload/v1776611489/category_yoga_hwftfm.jpg',
    },
    {
        id: 3,
        category: 'STRENGTH',
        intensity: 'EXTREME',
        title: 'CROSSFIT BEAST MODE',
        description: 'Functional movements at high intensity',
        duration: 50,
        calories: 720,
        imageUrl: 'https://res.cloudinary.com/dutmn3xde/image/upload/v1776611570/category_strength_nsba3a.jpg',
    },
    {
        id: 4,
        category: 'CARDIO',
        intensity: 'HARD',
        title: 'CARDIO RUSH',
        description: 'Explosive cardio for endurance and stamina',
        duration: 35,
        calories: 520,
        imageUrl: 'https://res.cloudinary.com/dutmn3xde/image/upload/v1776611721/gategory_cardio_at9k5v.jpg',
    },
    {
        id: 5,
        category: 'STRENGTH',
        intensity: 'HARD',
        title: 'IRON FOUNDRY',
        description: 'Pure strength training with progressive overload',
        duration: 55,
        calories: 480,
        imageUrl: 'https://res.cloudinary.com/dutmn3xde/image/upload/v1776611725/category_strenght_hard_ydduaa.jpg',
    },
    {
        id: 6,
        category: 'COMBAT',
        intensity: 'HARD',
        title: 'COMBAT STRIKE',
        description: 'Boxing combinations and explosive power',
        duration: 40,
        calories: 580,
        imageUrl: 'https://res.cloudinary.com/dutmn3xde/image/upload/v1776611827/catgory_combat_hard_tgrgsb.jpg',
    },
    {
        id: 7,
        category: 'FLEXIBILITY',
        intensity: 'MODERATE',
        title: 'PILATES PRECISION',
        description: 'Core-focused flexibility and controlled movements',
        duration: 50,
        calories: 320,
        imageUrl: 'https://res.cloudinary.com/dutmn3xde/image/upload/v1776611887/catgory_fexibility_moderate_d32ttr.jpg',
    },
    {
        id: 8,
        category: 'CARDIO',
        intensity: 'HARD',
        title: 'SPIN VELOCITY',
        description: 'High-energy indoor cycling with rhythm-based intervals',
        duration: 45,
        calories: 600,
        imageUrl: 'https://res.cloudinary.com/dutmn3xde/image/upload/v1776611950/category_hard_spin_velocity_f1fker.jpg',
    },
    ];

    export default function Workouts() {
    const workouts = mockWorkouts;

    return (
        <div>
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-[#D4FF00]">
            <Zap className="w-4 h-4" />
            <span className="font-['Roboto_Mono'] text-xs tracking-widest">PERFORMANCE CATALOG</span>
            </div>
            <h1 className="font-['Bebas_Neue'] text-6xl md:text-7xl tracking-wide mb-3">
            WORKOUT <span className="text-[#D4FF00]">EXPLORER</span>
            </h1>
            <p className="font-['Roboto_Mono'] text-sm text-gray-400">Browse high-quality training protocols and sessions</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
                type="text"
                placeholder="Search workouts..."
                className="w-full bg-[#151515]/80 border border-[#1A1A1A] rounded-xl pl-11 pr-4 py-3 font-['Roboto_Mono'] text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4FF00]/30"
            />
            </div>
            <button className="flex items-center gap-2 bg-[#151515]/80 border border-[#1A1A1A] rounded-xl px-5 py-3 font-['Roboto_Mono'] text-sm text-white hover:border-[#D4FF00]/30 transition">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
            ))}
        </div>
        </div>
    );
    }