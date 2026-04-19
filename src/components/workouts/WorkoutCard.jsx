    import { Clock, TrendingUp } from 'lucide-react';
    import ImageWithFallback from '../common/ImageWithFallback';

    const INTENSITY_COLORS = {
    MODERATE: 'bg-blue-400/20 text-blue-300',
    HARD: 'bg-orange-400/20 text-orange-300',
    EXTREME: 'bg-[#D4FF00]/20 text-[#D4FF00]',
    };

    export default function WorkoutCard({ workout }) {
    const { category, intensity, title, description, duration, calories, imageUrl } = workout;

    return (
        <div className="bg-[#151515]/80 backdrop-blur-xl border border-[#1A1A1A] rounded-2xl overflow-hidden flex flex-col hover:border-[#D4FF00]/30 transition">
        <div className="relative aspect-[16/10]">
            <ImageWithFallback src={imageUrl} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute top-3 left-3 font-['Roboto_Mono'] text-[10px] tracking-widest bg-black/60 backdrop-blur rounded-full px-3 py-1">
            {category}
            </span>
            <span
            className={`absolute top-3 right-3 font-['Roboto_Mono'] text-[10px] tracking-widest rounded-full px-3 py-1 ${
                INTENSITY_COLORS[intensity] || INTENSITY_COLORS.MODERATE
            }`}
            >
            {intensity}
            </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
            <h3 className="font-['Bebas_Neue'] text-2xl tracking-wide mb-2">{title}</h3>
            <p className="font-['Roboto_Mono'] text-xs text-gray-400 leading-relaxed mb-5 flex-1">{description}</p>

            <div className="border-t border-[#1A1A1A] pt-4 mb-4 flex items-center justify-between font-['Roboto_Mono'] text-xs">
            <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-[#D4FF00]" />
                <span>{duration} min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
                <TrendingUp className="w-4 h-4 text-[#D4FF00]" />
                <span>{calories} cal</span>
            </div>
            </div>

            <button className="w-full py-3 rounded-lg border border-[#D4FF00]/30 bg-[#D4FF00]/10 text-[#D4FF00] font-['Bebas_Neue'] tracking-wider hover:bg-[#D4FF00] hover:text-black transition">
            ENROLL NOW
            </button>
        </div>
        </div>
    );
    }