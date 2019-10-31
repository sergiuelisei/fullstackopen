import React, { useState, useEffect } from 'react';
import Blogs from './components/Results';
import blogsService from './services/blogs';
import loginService from './services/login';

// import logo from './logo.svg';
// import './App.css';

function App() {
	const [blogs, setBlogs] = useState([]);
	const [newBlog, setNewBlog] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogsService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem(`loggedBlogappUser`)
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogsService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password
			});

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogsService.setToken(user.token)
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			console.log(exception)
		}
	};

	const handleLogout = () => {
		setUser(null)
		blogsService.setToken(null)
		window.localStorage.removeItem('loggedBlogappUser')
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);


	const blogForm = () => (
		<Blogs
			user={user}
			blogs={blogs}
			handleLogout={handleLogout}
		/>

		// <form
		// // onSubmit={addNote}
		// >
		// 	<input
		// 		value={newBlog}
		// 	// onChange={handleNoteChange}
		// 	/>
		// 	<button type="submit">save</button>
		// </form>
	);

	return <div>{user === null ? loginForm() : blogForm()}</div>;
}

export default App;
