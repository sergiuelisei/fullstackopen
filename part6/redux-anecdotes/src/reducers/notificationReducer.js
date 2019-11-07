const initialNotification = 'Hi'

const notificationReducer = (state = initialNotification, action) => {
	switch (action.type) {
		case 'CREATE_NOTIFICATION':
			return action.content
		default:
			return state
	}
}

export const notificationChange = content => {
	return {
		type: 'CREATE_NOTIFICATION',
		content
	}
}

export default notificationReducer