import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotif, removeNotif } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		// const newAnec = await anecdoteService.createNew(content)
		props.createAnecdote(content)

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