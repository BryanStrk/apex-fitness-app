import axiosClient from './axiosClient';

/**
 * Servicio para gestionar workouts.
 * El frontend usa el lenguaje de dominio "workout" aunque el
 * endpoint del backend sigue siendo /api/activities.
 */

const BASE_URL = '/api/activities';

/**
 * Obtiene todos los workouts del catálogo.
 */
export const getAllWorkouts = async () => {
  const { data } = await axiosClient.get(BASE_URL);
  return data;
};

/**
 * Obtiene un workout por su id.
 */
export const getWorkoutById = async (id) => {
  const { data } = await axiosClient.get(`${BASE_URL}/${id}`);
  return data;
};

/**
 * Obtiene los workouts con fecha futura (próximas sesiones).
 */
export const getFutureWorkouts = async () => {
  const { data } = await axiosClient.get(`${BASE_URL}/future`);
  return data;
};

/**
 * Inscribe un usuario en un workout.
 */
export const enrollUser = async (workoutId, userId) => {
  const { data } = await axiosClient.post(`${BASE_URL}/${workoutId}/enroll/${userId}`);
  return data;
};

/**
 * Desinscribe un usuario de un workout.
 */
export const unenrollUser = async (workoutId, userId) => {
  const { data } = await axiosClient.delete(`${BASE_URL}/${workoutId}/unenroll/${userId}`);
  return data;
};