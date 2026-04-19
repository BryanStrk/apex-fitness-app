import { TrendingUp } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const DEFAULT_DATA = [
  { day: 'MON', workouts: 1.7 },
  { day: 'TUE', workouts: 0.8 },
  { day: 'WED', workouts: 1.7 },
  { day: 'THU', workouts: 0.8 },
  { day: 'FRI', workouts: 1.5 },
  { day: 'SAT', workouts: 2.5 },
  { day: 'SUN', workouts: 0.8 },
];

export default function WeeklyBreakdownChart({ data = DEFAULT_DATA, trend = '+24%' }) {
  const maxWorkouts = 3;

  return (
    <GlassCard>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-['Bebas_Neue'] text-3xl tracking-wide mb-1">WEEKLY BREAKDOWN</h3>
          <p className="font-['Roboto_Mono'] text-xs text-gray-400">Sessions & Calories Burned</p>
        </div>
        <div className="flex items-center gap-1 text-[#D4FF00]">
          <TrendingUp className="w-4 h-4" />
          <span className="font-['Roboto_Mono'] text-xs">{trend}</span>
        </div>
      </div>

      <div className="relative h-64 mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between font-['Roboto_Mono'] text-[10px] text-gray-500">
          {[3, 2.25, 1.5, 0.75, 0].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col justify-between font-['Roboto_Mono'] text-[10px] text-gray-500 text-right">
          {[1600, 1200, 800, 400, 0].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>

        <div className="absolute left-12 right-12 top-0 bottom-0 flex items-end justify-between gap-3">
          {data.map((item) => {
            const height = (item.workouts / maxWorkouts) * 100;
            return (
              <div key={item.day} className="flex-1 flex flex-col items-center h-full justify-end">
                <div className="w-full bg-[#D4FF00] rounded-t-sm" style={{ height: `${height}%` }} />
                <span className="font-['Roboto_Mono'] text-[10px] text-gray-500 tracking-widest mt-2">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-6 pt-4 border-t border-[#1A1A1A] font-['Roboto_Mono'] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#D4FF00]" />
          <span className="text-gray-400">Workouts</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#D4FF00]/30" />
          <span className="text-gray-400">Calories</span>
        </div>
      </div>
    </GlassCard>
  );
}