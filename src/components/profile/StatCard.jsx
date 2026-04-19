import { TrendingUp } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export default function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  iconBg = 'bg-[#1A1A1A]',
  iconColor = 'text-[#D4FF00]',
  badge,
}) {
  return (
    <GlassCard>
      <div className="flex items-start justify-between mb-8">
        <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center`}>
          {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
        </div>
        {badge ? (
          <span className="font-['Roboto_Mono'] text-xs text-[#D4FF00]">{badge}</span>
        ) : (
          <TrendingUp className="w-4 h-4 text-green-400" />
        )}
      </div>
      <p className="font-['Roboto_Mono'] text-sm text-gray-400 mb-2">{label}</p>
      <p className="font-['Bebas_Neue'] text-5xl mb-1">{value}</p>
      <p className="font-['Roboto_Mono'] text-xs text-gray-500">{subtitle}</p>
    </GlassCard>
  );
}