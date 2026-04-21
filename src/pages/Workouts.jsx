import { useState, useEffect, useCallback } from 'react';
import { Zap, Search, SlidersHorizontal, Loader2, AlertCircle } from 'lucide-react';
import WorkoutCard from '../components/workouts/WorkoutCard';
import { getAllWorkouts, enrollUser, unenrollUser } from '../api/workoutService';
import { getCurrentUser } from '../api/userService';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [workoutsData, userData] = await Promise.all([
        getAllWorkouts(),
        getCurrentUser(),
      ]);
      setWorkouts(workoutsData);
      setCurrentUser(userData);
    } catch (err) {
      setError('No se pudieron cargar los workouts. ¿Está el backend corriendo?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Comprueba si el usuario actual está inscrito en un workout
  const isUserEnrolled = (workout) => {
    if (!currentUser || !workout.users) return false;
    return workout.users.some((u) => u.id === currentUser.id);
  };

  // Toggle enrollment: llama al backend e actualiza el workout en el state
  const handleToggleEnroll = async (workoutId, isEnrolled) => {
    if (!currentUser) {
      throw new Error('No current user');
    }

    const updatedWorkout = isEnrolled
      ? await unenrollUser(workoutId, currentUser.id)
      : await enrollUser(workoutId, currentUser.id);

    // Actualiza solo el workout que cambió, sin recargar toda la lista
    setWorkouts((prev) =>
      prev.map((w) => (w.id === workoutId ? updatedWorkout : w))
    );
  };

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
            onClick={() => fetchData()}
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
              isEnrolled={isUserEnrolled(w)}
              onToggleEnroll={handleToggleEnroll}
            />
          ))}
        </div>
      )}
    </div>
  );
}