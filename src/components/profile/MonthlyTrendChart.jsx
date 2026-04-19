import GlassCard from '../common/GlassCard';

const DEFAULT_DATA = [
  { label: 'W1', value: 4500 },
  { label: 'W2', value: 4800 },
  { label: 'W3', value: 4700 },
  { label: 'W4', value: 5960 },
];

export default function MonthlyTrendChart({ data = DEFAULT_DATA }) {
  const width = 600;
  const height = 220;
  const padding = { top: 20, right: 30, bottom: 30, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxValue = 6000;
  const yAxisLabels = [6000, 4500, 3000, 1500, 0];

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartW;
    const y = padding.top + chartH - (d.value / maxValue) * chartH;
    return { x, y, ...d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <GlassCard>
      <div className="mb-6">
        <h3 className="font-['Bebas_Neue'] text-3xl tracking-wide mb-1">MONTHLY TREND</h3>
        <p className="font-['Roboto_Mono'] text-xs text-gray-400">Calories Burned Over Time</p>
      </div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {yAxisLabels.map((v, i) => {
          const y = padding.top + (i / (yAxisLabels.length - 1)) * chartH;
          return (
            <text
              key={v}
              x={padding.left - 8}
              y={y}
              fill="#6b7280"
              fontSize="10"
              fontFamily="Roboto Mono, monospace"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {v}
            </text>
          );
        })}

        <path d={pathD} fill="none" stroke="#D4FF00" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r="5" fill="#D4FF00" />
        ))}

        {points.map((p) => (
          <text
            key={p.label}
            x={p.x}
            y={height - 8}
            fill="#6b7280"
            fontSize="10"
            fontFamily="Roboto Mono, monospace"
            textAnchor="middle"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </GlassCard>
  );
}