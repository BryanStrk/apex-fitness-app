export default function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`bg-[#151515]/80 backdrop-blur-xl border border-[#1A1A1A] rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}