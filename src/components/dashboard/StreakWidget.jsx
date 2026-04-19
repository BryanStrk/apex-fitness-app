import { Award, Flame } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function StreakWidget({ days = 14, activeDays = [true, true, true, true, true, false, false] }) {
  return (
    <GlassCard className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
            <Award className="w-5 h-5 text-[#D4FF00]" />
          </div>
          <span className="font-['Roboto_Mono'] text-xs text-gray-400 tracking-widest">CURRENT STREAK</span>
        </div>
        <Flame className="w-5 h-5 text-[#D4FF00]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-6">
        <div className="flex items-baseline gap-2 mb-8">
          <span className="font-['Bebas_Neue'] text-8xl leading-none">{days}</span>
          <span className="font-['Roboto_Mono'] text-sm text-gray-400">days</span>
        </div>

        <div className="flex gap-2">
          {DAYS.map((day, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-['Roboto_Mono'] text-xs ${
                activeDays[idx] ? 'bg-[#D4FF00] text-black' : 'bg-[#1A1A1A] text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border border-[#1A1A1A] rounded-lg p-3 text-center">
        <p className="font-['Roboto_Mono'] text-xs text-gray-300">
          <span className="text-[#D4FF00]">Keep it up!</span> You're on fire 🔥
        </p>
      </div>
    </GlassCard>
  );
}