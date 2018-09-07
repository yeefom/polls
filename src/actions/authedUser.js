export const SET_AUTHE_USER = 'SET_AUTHE_USER';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHE_USER,
    id
  }
}
