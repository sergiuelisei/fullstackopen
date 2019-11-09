const notificationReducer = (state = '', action) => {
	switch (action.type) {
		case 'CREATE_NOTIFICATION':
			return action.content
		case 'REMOVE_NOTIFICATION':
			return ''
		default:
			return state
	}
}


export const setNotif = (message, time) => {
	return async dispatch => {
		dispatch({
			type: 'CREATE_NOTIFICATION',
			content: message

		})
		setTimeout(() => {
			dispatch({
				type: 'REMOVE_NOTIFICATION',
				content: ''
			})
		}, time)
	}
}

export default notificationReducer