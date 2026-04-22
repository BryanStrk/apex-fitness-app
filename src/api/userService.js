import axiosClient from './axiosClient';

/**
 * Servicio para gestionar usuarios.
 */

const BASE_URL = '/api/users';

/**
 * Obtiene todos los usuarios.
 */
export const getAllUsers = async () => {
  const { data } = await axiosClient.get(BASE_URL);
  return data;
};

/**
 * Obtiene un usuario por su id.
 */
export const getUserById = async (id) => {
  const { data } = await axiosClient.get(`${BASE_URL}/${id}`);
  return data;
};

/**
 * Obtiene el usuario actual.
 *
 * Por ahora devuelve el primer usuario activo (John Drake del seed).
 * Cuando implementemos autenticación, esto devolverá el usuario logueado.
 */
export const getCurrentUser = async () => {
  const users = await getAllUsers();
  if (!users || users.length === 0) return null;

  return users.find((u) => u.active) || users[0];
};

/**
 * Devuelve las iniciales del usuario (ej: "JD" para John Drake).
 */
export const getUserInitials = (user) => {
  if (!user) return '';
  const firstInitial = user.name?.[0] || '';
  const lastInitial = user.surname?.[0] || '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

/**
 * Devuelve el nombre completo en mayúsculas (ej: "JOHN DRAKE").
 */
export const getUserFullName = (user) => {
  if (!user) return '';
  return `${user.name || ''} ${user.surname || ''}`.trim().toUpperCase();
};

/**
 * Formatea el año de registro como "Jan YYYY" (ej: "Jan 2024").
 * El backend solo guarda el año, así que asumimos enero.
 */
export const getMemberSince = (user) => {
  if (!user?.registrationYear) return '—';
  return `Jan ${user.registrationYear}`;
};