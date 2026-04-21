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