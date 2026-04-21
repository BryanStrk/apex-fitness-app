import axiosClient from './axiosClient';
import { getFutureWorkouts } from './workoutService';

/**
 * Servicio para el Dashboard.
 * Agrega las llamadas que necesita la página principal.
 */

/**
 * Obtiene la próxima sesión futura del usuario.
 * 
 * Por ahora devuelve el primer workout con fecha futura.
 * En el futuro, cuando tengamos inscripciones reales,
 * esto devolverá la próxima sesión del usuario logueado.
 * 
 * @returns {Promise<Object|null>} El próximo workout o null si no hay
 */
export const getNextSession = async () => {
  const futureWorkouts = await getFutureWorkouts();

  if (!futureWorkouts || futureWorkouts.length === 0) {
    return null;
  }

  // Ordenar por fecha ascendente y devolver el primero
  const sorted = [...futureWorkouts].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sorted[0];
};