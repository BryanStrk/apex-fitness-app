import { useState, useEffect } from 'react';
import { Zap, Search, Loader2, AlertCircle } from 'lucide-react';
import WorkoutCard from '../components/workouts/WorkoutCard';
import FilterChips from '../components/workouts/FilterChips';
import { getAllWorkouts, enrollUser, unenrollUser } from '../api/workoutService';
import { getCurrentUser } from '../api/userService';

// Las opciones disponibles vienen de los enums del backend
const CATEGORY_OPTIONS = ['HIIT', 'YOGA', 'STRENGTH', 'CARDIO', 'COMBAT', 'FLEXIBILITY'];
const INTENSITY_OPTIONS = ['MODERATE', 'HARD', 'EXTREME'];

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de los filtros (null = "All")
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const [workoutsData, userData] = await Promise.all([
          getAllWorkouts(),
          getCurrentUser(),
        ]);

        if (cancelled) return;

        setWorkouts(workoutsData);
        setCurrentUser(userData);
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setError('No se pudieron cargar los workouts. ¿Está el backend corriendo?');
        console.error(err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const isUserEnrolled = (workout) => {
    if (!currentUser || !workout.users) return false;
    return workout.users.some((u) => u.id === currentUser.id);
  };

  const fetchData = async () => {
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
  };

  const handleToggleEnroll = async (workoutId, isEnrolled) => {
    try {
      if (!currentUser) {
        throw new Error('No current user');
      }

      const updatedWorkout = isEnrolled
        ? await unenrollUser(workoutId, currentUser.id)
        : await enrollUser(workoutId, currentUser.id);

      setWorkouts((prev) =>
        prev.map((w) => (w.id === workoutId ? updatedWorkout : w))
      );
    } catch (err) {
      console.error(err);
      setError('No se pudo actualizar la inscripción al workout.');
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedIntensity(null);
    setSearchQuery('');
  };

  // Aplicar los filtros: si están a null no filtran
  const filteredWorkouts = workouts.filter((w) => {
    const matchesCategory = !selectedCategory || w.category === selectedCategory;
    const matchesIntensity = !selectedIntensity || w.intensity === selectedIntensity;
    const matchesSearch =
      !searchQuery.trim() ||
      w.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesIntensity && matchesSearch;
  });

  const hasActiveFilters =
    selectedCategory !== null || selectedIntensity !== null || searchQuery.trim() !== '';

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

      {/* Search bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#151515]/80 border border-[#1A1A1A] rounded-xl pl-11 pr-12 py-3 font-['Roboto_Mono'] text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4FF00]/30"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D4FF00] transition font-['Roboto_Mono'] text-xs"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="mb-8 space-y-4 bg-[#151515]/40 border border-[#1A1A1A] rounded-xl p-5">
        <FilterChips
          label="CATEGORY"
          options={CATEGORY_OPTIONS}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
        <FilterChips
          label="INTENSITY"
          options={INTENSITY_OPTIONS}
          selected={selectedIntensity}
          onChange={setSelectedIntensity}
        />

        {/* Contador y botón clear (solo si hay filtros activos) */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-3 border-t border-[#1A1A1A]">
            <p className="font-['Roboto_Mono'] text-xs text-gray-400">
              Showing <span className="text-[#D4FF00]">{filteredWorkouts.length}</span> of{' '}
              <span className="text-gray-300">{workouts.length}</span> workouts
            </p>
            <button
              onClick={clearFilters}
              className="font-['Roboto_Mono'] text-xs text-red-300 hover:text-red-400 transition tracking-widest"
            >
              CLEAR FILTERS
            </button>
          </div>
        )}
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
            onClick={fetchData}
            className="font-['Bebas_Neue'] tracking-wider px-6 py-2 rounded-lg border border-red-500/30 text-red-300 hover:bg-red-500/10 transition"
          >
            RETRY
          </button>
        </div>
      )}

      {/* Empty state (no workouts en BD) */}
      {!loading && !error && workouts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="font-['Roboto_Mono'] text-sm text-gray-400">
            No workouts available yet.
          </p>
        </div>
      )}

      {/* Empty state (filtros sin resultados) */}
      {!loading && !error && workouts.length > 0 && filteredWorkouts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 border border-[#1A1A1A] rounded-2xl">
          <p className="font-['Roboto_Mono'] text-sm text-gray-400 text-center">
            No workouts match the selected filters.
          </p>
          <button
            onClick={clearFilters}
            className="font-['Bebas_Neue'] tracking-wider px-6 py-2 rounded-lg border border-[#D4FF00]/30 text-[#D4FF00] hover:bg-[#D4FF00]/10 transition"
          >
            CLEAR FILTERS
          </button>
        </div>
      )}

      {/* Workouts grid (solo los filtrados) */}
      {!loading && !error && filteredWorkouts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredWorkouts.map((w) => (
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