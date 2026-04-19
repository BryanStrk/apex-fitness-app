    import { Battery, Zap } from 'lucide-react';
    import GlassCard from '../common/GlassCard';
    import CircularProgress from '../common/CircularProgress';

    export default function EnergyWidget({ level = 87, message }) {
    return (
        <GlassCard className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                <Battery className="w-5 h-5 text-[#D4FF00]" />
            </div>
            <span className="font-['Roboto_Mono'] text-xs text-gray-400 tracking-widest">ENERGY LEVEL</span>
            </div>
            <Zap className="w-5 h-5 text-[#D4FF00]" />
        </div>

        <div className="flex-1 flex items-center justify-center py-6">
            <CircularProgress value={level} size={200}>
            <span className="font-['Bebas_Neue'] text-6xl text-[#D4FF00]">{level}</span>
            <span className="font-['Roboto_Mono'] text-xs text-gray-400 tracking-widest mt-1">OPTIMAL</span>
            </CircularProgress>
        </div>

        {message && (
            <div className="border border-[#1A1A1A] rounded-lg p-3 mt-4">
            <p className="font-['Roboto_Mono'] text-xs text-gray-400 text-center leading-relaxed">{message}</p>
            </div>
        )}
        </GlassCard>
    );
    }