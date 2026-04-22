/**
 * Componente reutilizable de chips para filtrar.
 *
 * Props:
 * - label: título del grupo (ej: "CATEGORY")
 * - options: array de opciones (ej: ['HIIT', 'YOGA', ...])
 * - selected: opción actualmente seleccionada (o null para "All")
 * - onChange: callback al hacer click en un chip
 */
export default function FilterChips({ label, options, selected, onChange }) {
  const baseChip =
  "font-['Roboto_Mono'] text-xs tracking-widest px-3 py-1.5 rounded-full border transition focus:outline-none";
  const activeChip = "bg-[#D4FF00] text-black border-[#D4FF00]";
  const inactiveChip = "bg-transparent text-gray-300 border-[#1A1A1A] hover:border-[#D4FF00]/30";

  return (
    <div>
      <p className="font-['Roboto_Mono'] text-[10px] tracking-widest text-gray-500 mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {/* Chip "All" */}
        <button
          onClick={() => onChange(null)}
          className={`${baseChip} ${selected === null ? activeChip : inactiveChip}`}
        >
          ALL
        </button>

        {/* Chips de cada opción */}
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`${baseChip} ${selected === option ? activeChip : inactiveChip}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}