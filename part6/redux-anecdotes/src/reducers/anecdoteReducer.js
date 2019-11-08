// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
// 	return {
// 		content: anecdote,
// 		id: getId(),
// 		votes: 0
// 	}
// }


export const addVote = id => {
	return {
		type: 'VOTE',
		data: { id }
	}
}

export const createAnecdote = content => {
	return {
		type: 'ADD',
		data: content

	}
}

export const initializeAnec = anecdotes => {
	return {
		type: 'INIT_ANEC',
		data: anecdotes
	}
}

const ancedoteReducer = (state = [], action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
		case 'VOTE':
			let target = state.find(p => p.id === action.data.id)
			target = { ...target, votes: target.votes + 1 }
			return state
				.map(p => (p.id !== action.data.id ? p : target))
				.sort((a, b) => b.votes - a.votes)
		case 'ADD':
			return state.concat(action.data)
		case 'INIT_ANEC':
			return action.data

		default:
			return state
	}
}

export default ancedoteReducer 