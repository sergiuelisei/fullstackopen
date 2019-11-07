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

export const setNotif = content => {
	return {
		type: 'CREATE_NOTIFICATION',
		content
	}
}

export const removeNotif = () => {
	return {
		type: 'REMOVE_NOTIFICATION'
	}
}
export default notificationReducer