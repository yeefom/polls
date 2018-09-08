import React, { Component } from 'react';
import { connect } from 'react-redux'

class Dashboard extends Component {
  state = {
    showAnswered: false
  }

  showUnanswered = () => {
    this.setState(() => ({
      showAnswered: false
    }))
  }

  showAnswered = () => {
    this.setState(() => ({
      showAnswered: true
    }))
  }

  render() {
    const { showAnswered } = this.state
    const { answered, unanswered } = this.props

    const list = showAnswered ? answered : unanswered

    return (
      <div>
        <div className='dashboard-toggle'>
          <button
            style={{ textDecoration: !showAnswered ? 'underline' : null }}
            onClick={this.showUnanswered}>
            Unanswered
          </button>
          <span>|</span>
          <button
            style={{ textDecoration: showAnswered ? 'underline' : null }}
            onClick={this.showAnswered}>
            Answered
          </button>
        </div>

        <ul className='dashboard-list'>
          {list.map(item =>
            <li key={item.id}>{item.question}</li>
          )}
        </ul>
      </div>
    )
  }
}

const sorter = (a, b) => b.timestamp - a.timestamp

function mapStateToProps({ authedUser, polls, users }) {
  const answers = users[authedUser].answers
  const answered = answers.map(id => polls[id])
    .sort(sorter)
  const unanswered = Object.keys(polls)
    .filter(id => !answers.includes(id))
    .map(id => polls[id])
    .sort(sorter)

  return {
    answered,
    unanswered
  }
}

export default connect(mapStateToProps)(Dashboard);
