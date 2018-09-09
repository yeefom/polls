import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPercentage } from '../utils/helpers'
import { handleAddAnswer } from '../actions/answers'

const votesKeys = ['aVotes', 'bVotes', 'cVotes', 'dVotes'];

class Poll extends Component {
  handleAnswer = (answer) => {
    const { poll, authedUser } = this.props
    this.answered = true
    this.props.dispatch(handleAddAnswer({
      authedUser,
      answer,
      id: poll.id
    }))
  }

  render() {
    if (this.props.poll === null) {
      return <p>Poll does not exist</p>
    }

    const { poll, vote, authorAvatar } = this.props

    const totalVotes = votesKeys.reduce((total, key) => total + poll[key].length, 0)

    return (
      <div className='poll-container'>
        <h1 className='question'>
          {poll.question}
        </h1>
        <div className='poll-author'>
          By <img src={authorAvatar} alt='Author avatar'/>
        </div>
        <ul>
          {['aText', 'bText', 'cText', 'dText'].map(option => {
            const count = poll[option[0] + 'Votes'].length
            return (
              <li key={option}
                className={`option ${vote === option[0] ? 'chosen' : ''}`}
                onClick = {() => {
                  if (!vote && !this.answered) {
                    this.handleAnswer(option[0])
                  }
                }}>
                {
                  vote === null
                    ? poll[option]
                    : <div className='result'>
                        <span>{poll[option]}</span>
                        <span>{getPercentage(count, totalVotes)}% ({count})</span>
                      </div>
                }
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, polls, users }, { match }) {
  // const { id } = match.params
  const poll = polls['loxhs1bqm25b708cmbf3g']

  if (!poll) {
    return {
      poll: null
    }
  }

  const votedKey = votesKeys.reduce((voted, key) => {
    if (voted) {
      return voted
    }

    return poll[key].includes(authedUser) ? key : voted
  }, null)

  const vote = votedKey ? votedKey[0] : null

  return {
    poll,
    vote,
    authedUser,
    authorAvatar: users[poll.author].avatarURL
  }
}

export default connect(mapStateToProps)(Poll)
