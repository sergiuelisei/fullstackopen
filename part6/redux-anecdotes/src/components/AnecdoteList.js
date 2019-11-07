import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotif, removeNotif } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
	const anecdotes = props.store.getState().anecdotes

	const vote = (id, content) => {
		// console.log('vote', id)
		props.store.dispatch(addVote(id))
		props.store.dispatch(setNotif(`You voted for: ${content}`))
		setTimeout(() => {
			props.store.dispatch(removeNotif())
		}, 5000)
	}


	return (
		<div>
			{
				anecdotes
					.filter(anecdote =>
						anecdote.content.toLowerCase()
							.includes(props.store.getState().filter.toLowerCase()))
					.map(anecdote =>
						<div key={anecdote.id}>
							<div>
								{anecdote.content}
							</div>
							<div>
								has {anecdote.votes}
								<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
							</div>
						</div>
					)
			}
		</div>
	)
}

export default AnecdoteList