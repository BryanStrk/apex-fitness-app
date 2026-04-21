import { useState, useEffect } from 'react';
import { Zap, Search, SlidersHorizontal, Loader2, AlertCircle } from 'lucide-react';
import WorkoutCard from '../components/workouts/WorkoutCard';
import { getAllWorkouts } from '../api/workoutService';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (err) {
        setError('No se pudieron cargar los workouts. ¿Está el backend corriendo?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-[#D4FF00]">
          <Zap className="w-4 h-4" />
          <span className="font-['Roboto_Mono'] text-xs tracking-widest">PERFORMANCE CATALOG</span>
        </div>
        <h1 className="font-['Bebas_Neue'] text-6xl md:text-7xl tracking-wide mb-3">
          WORKOUT <span className="text-[#D4FF00]">EXPLORER</span>
        </h1>
        <p className="font-['Roboto_Mono'] text-sm text-gray-400">
          Browse high-quality training protocols and sessions
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search workouts..."
            className="w-full bg-[#151515]/80 border border-[#1A1A1A] rounded-xl pl-11 pr-4 py-3 font-['Roboto_Mono'] text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4FF00]/30"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#151515]/80 border border-[#1A1A1A] rounded-xl px-5 py-3 font-['Roboto_Mono'] text-sm text-white hover:border-[#D4FF00]/30 transition">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-12 h-12 text-[#D4FF00] animate-spin" />
          <p className="font-['Roboto_Mono'] text-sm text-gray-400 tracking-widest">
            LOADING WORKOUTS...
          </p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 border border-red-500/20 rounded-2xl bg-red-500/5">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <p className="font-['Roboto_Mono'] text-sm text-red-300 text-center max-w-md">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="font-['Bebas_Neue'] tracking-wider px-6 py-2 rounded-lg border border-red-500/30 text-red-300 hover:bg-red-500/10 transition"
          >
            RETRY
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && workouts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="font-['Roboto_Mono'] text-sm text-gray-400">
            No workouts available yet.
          </p>
        </div>
      )}

      {/* Workouts grid */}
      {!loading && !error && workouts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {workouts.map((w) => (
            <WorkoutCard
              key={w.id}
              workout={{
                id: w.id,
                category: w.category,
                intensity: w.intensity,
                title: w.title,
                description: w.description,
                duration: w.durationMinutes,
                calories: w.caloriesEstimate,
                imageUrl: w.imageUrl,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}