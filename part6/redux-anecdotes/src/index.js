import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import ancedoteReducer, { initializeAnec } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
// import anecdotesService from './services/anecdotes'

const reducer = combineReducers({
	anecdotes: ancedoteReducer,
	notification: notificationReducer,
	filter: filterReducer
})

const store = createStore(reducer)

// anecdotesService.getAll().then(anecdotes =>
// 	store.dispatch(initializeAnec(anecdotes))
// )

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)