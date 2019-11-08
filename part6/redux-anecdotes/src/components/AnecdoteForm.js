import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotif, removeNotif } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		props.createAnecdote(content)
		event.target.anecdote.value = ''

		props.setNotif(`You created a new anecdote: ${content}`)

		setTimeout(() => {
			props.removeNotif()
		}, 5000)
	}

	return (
		<form onSubmit={addAnecdote}>
			<div><input name='anecdote' /></div>
			<button type='submit'>create</button>
		</form>
	)
}

const mapDispatchToProps = {
	createAnecdote,
	setNotif,
	removeNotif
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm