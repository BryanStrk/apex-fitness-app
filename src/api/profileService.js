import { getAllWorkouts } from './workoutService';
import { getCurrentUser } from './userService';

/**
 * Servicio para la página Profile.
 *
 * Por ahora calcula stats client-side a partir de los workouts
 * en los que el usuario está inscrito. Cuando el backend tenga
 * agregados (DailyStats, achievements, etc.), parte de esta lógica
 * se moverá al servidor.
 */

/**
 * Devuelve los workouts en los que el usuario está inscrito.
 */
const getUserWorkouts = (workouts, userId) => {
  return workouts.filter((w) =>
    w.users?.some((u) => u.id === userId)
  );
};

/**
 * Comprueba si una fecha está dentro de los últimos N días.
 */
const isWithinDays = (dateString, days) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= days;
};

/**
 * Calcula las stats del perfil del usuario actual a partir de sus
 * inscripciones a workouts.
 */
export const getProfileData = async () => {
  const [user, workouts] = await Promise.all([
    getCurrentUser(),
    getAllWorkouts(),
  ]);

  if (!user) {
    return null;
  }

  const userWorkouts = getUserWorkouts(workouts, user.id);
  const weeklyWorkouts = userWorkouts.filter((w) => isWithinDays(w.date, 7));

  const caloriesBurned = userWorkouts.reduce(
    (sum, w) => sum + (w.caloriesEstimate || 0),
    0
  );
  const weeklyBurn = weeklyWorkouts.reduce(
    (sum, w) => sum + (w.caloriesEstimate || 0),
    0
  );

  return {
    user,
    totalWorkouts: userWorkouts.length,
    caloriesBurned: Math.round(caloriesBurned),
    weekSessions: weeklyWorkouts.length,
    weeklyBurn: Math.round(weeklyBurn),
  };
};