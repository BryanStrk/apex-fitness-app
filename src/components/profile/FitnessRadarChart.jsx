import GlassCard from '../common/GlassCard';

const DEFAULT_STATS = [
  { label: 'Strength', value: 85 },
  { label: 'Cardio', value: 70 },
  { label: 'Flexibility', value: 60 },
  { label: 'Endurance', value: 80 },
  { label: 'Power', value: 75 },
];

export default function FitnessRadarChart({ stats = DEFAULT_STATS }) {
  const size = 300;
  const center = size / 2;
  const maxRadius = size / 2 - 50;
  const levels = 4;
  const angleStep = (Math.PI * 2) / stats.length;

  const getPoint = (value, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return { x: center + Math.cos(angle) * radius, y: center + Math.sin(angle) * radius };
  };

  const getLabelPoint = (index) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = maxRadius + 25;
    return { x: center + Math.cos(angle) * radius, y: center + Math.sin(angle) * radius };
  };

  const dataPoints = stats.map((s, i) => getPoint(s.value, i));
  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <GlassCard>
      <div className="mb-6">
        <h3 className="font-['Bebas_Neue'] text-3xl tracking-wide mb-1">FITNESS PROFILE</h3>
        <p className="font-['Roboto_Mono'] text-xs text-gray-400">Category Strengths</p>
      </div>

      <div className="flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {Array.from({ length: levels }).map((_, i) => {
            const r = ((i + 1) / levels) * maxRadius;
            const points = stats
              .map((_, idx) => {
                const angle = angleStep * idx - Math.PI / 2;
                return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
              })
              .join(' ');
            return <polygon key={i} points={points} fill="none" stroke="#1A1A1A" strokeWidth="1" />;
          })}

          {stats.map((_, i) => {
            const angle = angleStep * i - Math.PI / 2;
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={center + Math.cos(angle) * maxRadius}
                y2={center + Math.sin(angle) * maxRadius}
                stroke="#1A1A1A"
                strokeWidth="1"
              />
            );
          })}

          <polygon points={polygonPoints} fill="#D4FF00" fillOpacity="0.2" stroke="#D4FF00" strokeWidth="2" />

          {dataPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#D4FF00" />
          ))}

          {stats.map((s, i) => {
            const p = getLabelPoint(i);
            return (
              <text
                key={s.label}
                x={p.x}
                y={p.y}
                fill="#9ca3af"
                fontSize="11"
                fontFamily="Roboto Mono, monospace"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {s.label}
              </text>
            );
          })}
        </svg>
      </div>
    </GlassCard>
  );
}