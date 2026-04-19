    import { Activity, TrendingUp } from 'lucide-react';
    import GlassCard from '../common/GlassCard';

    const DEFAULT_DATA = [
    { day: 'MON', value: 40 },
    { day: 'TUE', value: 75 },
    { day: 'WED', value: 50 },
    { day: 'THU', value: 90 },
    { day: 'FRI', value: 45 },
    { day: 'SAT', value: 100 },
    { day: 'SUN', value: 35 },
    ];

    export default function WeeklyActivityWidget({
    data = DEFAULT_DATA,
    trend = '+18% vs last week',
    totalHours = 12.0,
    sessions = 7,
    avgDuration = '1.7H',
    }) {
    const maxValue = Math.max(...data.map((d) => d.value));

    return (
        <GlassCard>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#D4FF00]" />
            </div>
            <span className="font-['Roboto_Mono'] text-xs text-gray-400 tracking-widest">WEEKLY ACTIVITY</span>
            </div>
            <div className="flex items-center gap-1 text-[#D4FF00]">
            <TrendingUp className="w-4 h-4" />
            <span className="font-['Roboto_Mono'] text-xs">{trend}</span>
            </div>
        </div>

        <div className="flex items-end justify-between gap-3 h-48 mb-4">
            {data.map((item) => {
            const height = (item.value / maxValue) * 100;
            const isPeak = item.value === maxValue;
            return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                    <div
                    className="w-full rounded-md transition-all"
                    style={{
                        height: `${height}%`,
                        background: isPeak ? '#D4FF00' : 'rgba(212, 255, 0, 0.3)',
                    }}
                    />
                </div>
                <span className="font-['Roboto_Mono'] text-[10px] text-gray-500 tracking-widest">{item.day}</span>
                </div>
            );
            })}
        </div>

        <div className="border-t border-[#1A1A1A] pt-4 grid grid-cols-3 gap-4">
            <div>
            <p className="font-['Roboto_Mono'] text-xs text-gray-400 mb-1">Total Hours</p>
            <p className="font-['Bebas_Neue'] text-2xl">{totalHours}</p>
            </div>
            <div>
            <p className="font-['Roboto_Mono'] text-xs text-gray-400 mb-1">Sessions</p>
            <p className="font-['Bebas_Neue'] text-2xl">{sessions}</p>
            </div>
            <div>
            <p className="font-['Roboto_Mono'] text-xs text-gray-400 mb-1">Avg Duration</p>
            <p className="font-['Bebas_Neue'] text-2xl">{avgDuration}</p>
            </div>
        </div>
        </GlassCard>
    );
    }