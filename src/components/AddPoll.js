import React, {Component} from 'react';
import { connect } from 'react-redux';
import { handleAddPoll } from '../actions/polls'

class AddPoll extends Component {
  state = {
    question: '',
    a: '',
    b: '',
    c: '',
    d: ''
  }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }

  isSubmitEnabled = () => {
    return Object.keys(this.state).every(prop => !!this.state[prop])
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // redirect to home
    this.props.dispatch(handleAddPoll(this.state))
  }

  render() {
    const { question, a, b, c, d } = this.state

    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h3 style={{ marginBottom: 5 }}>Question</h3>
        <input
          value={question}
          onChange={this.handleInputChange}
          name='question'
          className='input'
          type='text'
        />

        <h3>Options</h3>
        <label className='label' htmlFor='a'>A.</label>
        <input
          value={a}
          onChange={this.handleInputChange}
          name='a'
          className='input'
          type='text'
        />
        <label className='label' htmlFor='b'>B.</label>
        <input
          value={b}
          onChange={this.handleInputChange}
          name='b'
          className='input'
          type='text'
        />
        <label className='label' htmlFor='c'>C.</label>
        <input
          value={c}
          onChange={this.handleInputChange}
          name='c'
          className='input'
          type='text'
        />
        <label className='label' htmlFor='d'>D.</label>
        <input
          value={d}
          onChange={this.handleInputChange}
          name='d'
          className='input'
          type='text'
        />

        <button className='btn' type='submit' disabled={!this.isSubmitEnabled()}>
          Submit
        </button>
      </form>
    );
  }
}

export default connect()(AddPoll);
