import { SET_AUTHE_USER } from '../actions/authedUser'

export default function authedUser(state = null, action) {
  switch(action.type) {
    case SET_AUTHE_USER:
      return action.authedUser
    default:
      return state
  }
};
