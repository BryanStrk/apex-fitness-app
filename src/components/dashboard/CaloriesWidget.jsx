    import { Flame, TrendingUp } from 'lucide-react';
    import GlassCard from '../common/GlassCard';
    import CircularProgress from '../common/CircularProgress';

    export default function CaloriesWidget({ burned = 1247, goal = 1500, trend = '+12%' }) {
    const progress = Math.round((burned / goal) * 100);

    return (
        <GlassCard className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#D4FF00]" />
            </div>
            <span className="font-['Roboto_Mono'] text-xs text-gray-400 tracking-widest">CALORIES BURNED</span>
            </div>
            <div className="flex items-center gap-1 text-[#D4FF00]">
            <TrendingUp className="w-4 h-4" />
            <span className="font-['Roboto_Mono'] text-xs">{trend}</span>
            </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-6">
            <CircularProgress value={burned} max={goal} size={200}>
            <span className="font-['Bebas_Neue'] text-5xl">{burned}</span>
            <span className="font-['Roboto_Mono'] text-xs text-gray-400 mt-1">of {goal} kcal</span>
            </CircularProgress>
        </div>

        <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
            <span className="font-['Roboto_Mono'] text-xs text-gray-400">Today's Progress</span>
            <span className="font-['Roboto_Mono'] text-xs text-[#D4FF00]">{progress}%</span>
            </div>
            <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div className="h-full bg-[#D4FF00] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
        </div>
        </GlassCard>
    );
    }