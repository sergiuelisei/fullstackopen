import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotif, removeNotif } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		props.store.dispatch(createAnecdote(content))
		event.target.anecdote.value = ''

		props.store.dispatch(setNotif(`You created a new anecdote: ${content}`))
		setTimeout(() => {
			props.store.dispatch(removeNotif())
		}, 5000)
	}

	return (
		<form onSubmit={addAnecdote}>
			<div><input name='anecdote' /></div>
			<button type='submit'>create</button>
		</form>
	)
}

export default AnecdoteForm