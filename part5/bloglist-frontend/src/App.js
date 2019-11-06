import React, { useState, useEffect } from 'react'
import Blogs from './components/Results'
import AddNewBlog from './components/AddNewBlog'
import Notification from './components/Notification'
import blogsService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useField } from './hooks'

// import logo from './logo.svg';
// import './App.css';

function App() {

	const blogFormRef = React.createRef()

	const [blogs, setBlogs] = useState([])
	// const [username, setUsername] = useState('')
	// const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [notificationMessage, setNotificationMessage] = useState(null)

	const username = useField('text')
	const password = useField('password')


	useEffect(() => {
		blogsService.getAll().then((initialBlogs) => setBlogs(initialBlogs))

	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			blogsService.setToken(user.token)
			setUser(user)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: username.data.value,
				password: password.data.value
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogsService.setToken(user.token)
			setUser(user)
			username.reset()
			password.reset()
		} catch (error) {
			setNotificationMessage({
				'text': 'Wrong credentials',
				'type': 'error'
			})
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)

		}
	}

	const handleLogout = () => {
		setUser(null)
		blogsService.setToken(null)
		window.localStorage.removeItem('loggedBlogappUser')
	}

	const handleAddBlog = async (event) => {
		event.preventDefault()

		blogFormRef.current.toggleVisibility()

		const blog = {
			title,
			user,
			author,
			url,
			likes: 0
		}
		console.log(blog)
		if (!title || !author || !url) {
			setNotificationMessage({
				'text': 'Empty fields',
				'type': 'error'
			})
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		}
		else {
			try {
				blogsService.setToken(user.token)
				const response = await blogsService.create(blog)
				setBlogs(blogs.concat(response))
				setTitle('')
				setAuthor('')
				setUrl('')

				setNotificationMessage({
					'text': `${title} by ${author} added`,
					'type': 'notification'
				})
				setTimeout(() => {
					setNotificationMessage(null)
				}, 5000)

			} catch (err) {
				console.log(err)
			}
		}
	}

	const handleLike = async blog => {

		// const selectBlogId = event.target.value;
		// const selectedBlog = blogs.find(blog => blog.id === selectBlogId);
		// // console.log(selectBlogId)
		// // console.log(selectedBlog);

		// const blog = {
		// 	user: selectedBlog.user.id,
		// 	...selectedBlog,
		// 	likes: selectedBlog.likes + 1
		// }
		// console.log(blog)

		try {
			// const response = await blogsService.update(selectBlogId, blog)
			// setBlogs(blogs.map(blog => blog.id === selectBlogId ? response : blog))
			const newObject = { ...blog.blog, likes: blog.blog.likes + 1 }
			console.log(newObject)
			blogsService.update(blog.blog.id, newObject)
			setBlogs(blogs.map(p => (p.id === blog.blog.id ? newObject : p)))
		} catch (error) {
			setNotificationMessage({
				'text': error.response.data.error,
				'type': 'error'
			})

			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		}
	}

	const handleRemove = async (e) => {
		const selectBlogId = e.target.value
		const selectedBlog = blogs.find(b => b.id === selectBlogId)

		const msg = `remove blog ${selectedBlog.title}`

		try {
			if (window.confirm(msg) === true) {
				blogsService.setToken(user.token)
				await blogsService.remove(selectBlogId)
				setBlogs(blogs.filter(b => b.id !== selectBlogId))
				setNotificationMessage({
					'text': 'deleted!',
					'type': 'notification'
				})
				setTimeout(() => {
					setNotificationMessage(null)
				}, 5000)
			}

		} catch (error) {
			setNotificationMessage({
				'text': 'Only the owner of the post can delete it	',
				'type': 'error'
			})

			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					{...username.data}
				/>
			</div>
			<div>
				password
				<input
					{...password.data}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)


	const blogForm = () => (
		<div>
			<div>
				<h2>blogs</h2>
				<p>{`${user.name} logged in`}
					<button onClick={handleLogout}>Logout</button>
				</p>
			</div>



			<Togglable buttonLabel="new blog" ref={blogFormRef}>
				<AddNewBlog
					handleTitleChange={(e) => setTitle(e.target.value)}
					handleAuthorChange={(e) => setAuthor(e.target.value)}
					handleUrlChange={(e) => setUrl(e.target.value)}
					handleAddBlog={(e) => handleAddBlog(e)}
				/>
			</Togglable>

			<br />
			<Blogs
				user={user}
				blogs={blogs}
				handleLike={(e) => handleLike(e)}
				handleRemove={(e) => handleRemove(e)}
			/>
		</div>

	)


	return <div>
		{notificationMessage !== null ? <Notification message={notificationMessage} /> : null}
		{user === null ? loginForm() : blogForm()}
	</div>
}

export default App
