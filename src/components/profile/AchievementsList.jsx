import { Flame, Target, Zap, Calendar } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const DEFAULT_ACHIEVEMENTS = [
  { icon: Flame, label: '14-Day Streak', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { icon: Target, label: '50 Workouts', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { icon: Zap, label: 'Beast Mode', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: Calendar, label: 'Consistency King', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

export default function AchievementsList({ achievements = DEFAULT_ACHIEVEMENTS }) {
  return (
    <GlassCard>
      <div className="mb-6">
        <h3 className="font-['Bebas_Neue'] text-3xl tracking-wide mb-1">ACHIEVEMENTS</h3>
        <p className="font-['Roboto_Mono'] text-xs text-gray-400">Recent Unlocks</p>
      </div>

      <div className="space-y-3">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 rounded-lg border border-[#1A1A1A] hover:border-[#D4FF00]/30 transition"
          >
            <div className={`w-10 h-10 rounded-lg ${a.bg} flex items-center justify-center`}>
              <a.icon className={`w-5 h-5 ${a.color}`} />
            </div>
            <span className="font-['Roboto_Mono'] text-sm">{a.label}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}