import { Calendar, Clock, MapPin, User } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export default function NextSessionWidget({ session = {} }) {
  const {
    title = 'Metabolic Breakdown',
    description = 'High-intensity interval training for maximum caloric burn',
    time = 'Today, 18:30 - 19:30',
    location = 'Floor Alpha',
    coach = 'Coach Marcus Kane',
    status = 'SCHEDULED',
  } = session;

  return (
    <GlassCard className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#D4FF00]" />
          </div>
          <span className="font-['Roboto_Mono'] text-xs text-gray-400 tracking-widest">NEXT SESSION</span>
        </div>
        <span className="font-['Roboto_Mono'] text-[10px] tracking-widest text-[#D4FF00] border border-[#D4FF00]/30 rounded-full px-2 py-0.5">
          {status}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-['Bebas_Neue'] text-3xl mb-2 tracking-wide">{title}</h3>
        <p className="font-['Roboto_Mono'] text-sm text-gray-400 leading-relaxed mb-6">{description}</p>

        <div className="space-y-3 font-['Roboto_Mono'] text-sm">
          <div className="flex items-center gap-3 text-gray-300">
            <Clock className="w-4 h-4 text-[#D4FF00]" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <MapPin className="w-4 h-4 text-[#D4FF00]" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <User className="w-4 h-4 text-[#D4FF00]" />
            <span>{coach}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <button className="w-full py-3 rounded-lg bg-[#D4FF00] text-black font-['Bebas_Neue'] text-lg tracking-wider hover:bg-[#c5ef00] transition">
          START SESSION
        </button>
        <button className="w-full py-3 rounded-lg border border-[#1A1A1A] text-gray-300 font-['Bebas_Neue'] tracking-wider hover:border-gray-600 transition">
          RESCHEDULE
        </button>
      </div>
    </GlassCard>
  );
}