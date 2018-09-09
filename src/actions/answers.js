import { savePollAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_ANSWER = 'ADD_ANSWER'

function addAnwser ({ authedUser, id, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    id,
    answer
  }
}

export function handleAddAnswer(answer) {
  return (dispatch) => {
    dispatch(showLoading())

    return savePollAnswer(answer)
      .then(() => dispatch(addAnwser(answer)))
      .then(() => dispatch(hideLoading()))
  }
}
