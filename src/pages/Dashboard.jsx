    import { Zap } from 'lucide-react';
    import EnergyWidget from '../components/dashboard/EnergyWidget';
    import CaloriesWidget from '../components/dashboard/CaloriesWidget';
    import NextSessionWidget from '../components/dashboard/NextSessionWidget';
    import WeeklyActivityWidget from '../components/dashboard/WeeklyActivityWidget';
    import StreakWidget from '../components/dashboard/StreakWidget';
    import MusicPlayerWidget from '../components/dashboard/MusicPlayerWidget';

    // MOCK DATA - reemplaza con: useEffect(() => axios.get('/api/dashboard').then(setData), [])
    const mockDashboardData = {
    energy: {
        level: 87,
        message: 'Your energy is optimal for high-intensity training. Peak performance window active.',
    },
    calories: { burned: 1247, goal: 1500, trend: '+12%' },
    nextSession: {
        title: 'Metabolic Breakdown',
        description: 'High-intensity interval training for maximum caloric burn',
        time: 'Today, 18:30 - 19:30',
        location: 'Floor Alpha',
        coach: 'Coach Marcus Kane',
        status: 'SCHEDULED',
    },
    weeklyActivity: {
        data: [
        { day: 'MON', value: 40 },
        { day: 'TUE', value: 75 },
        { day: 'WED', value: 50 },
        { day: 'THU', value: 90 },
        { day: 'FRI', value: 45 },
        { day: 'SAT', value: 100 },
        { day: 'SUN', value: 35 },
        ],
        trend: '+18% vs last week',
        totalHours: 12.0,
        sessions: 7,
        avgDuration: '1.7H',
    },
    streak: { days: 14, activeDays: [true, true, true, true, true, false, false] },
    };

    export default function Dashboard() {
    const data = mockDashboardData;

    return (
        <div>
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-[#D4FF00]">
            <Zap className="w-4 h-4" />
            <span className="font-['Roboto_Mono'] text-xs tracking-widest">SYSTEM STATUS: OPTIMAL</span>
            </div>
            <h1 className="font-['Bebas_Neue'] text-6xl md:text-7xl tracking-wide mb-3">
            KINETIC <span className="text-[#D4FF00]">DASHBOARD</span>
            </h1>
            <p className="font-['Roboto_Mono'] text-sm text-gray-400">
            Real-time performance metrics and activity management
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <EnergyWidget {...data.energy} />
            <CaloriesWidget {...data.calories} />
            <NextSessionWidget session={data.nextSession} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
            <WeeklyActivityWidget {...data.weeklyActivity} />
            </div>
            <StreakWidget {...data.streak} />
        </div>

        <MusicPlayerWidget />
        </div>
    );
    }