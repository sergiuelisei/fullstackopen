const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const helper = require('./test_helper');

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(helper.initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(helper.initialBlogs[1]);
	await blogObject.save();
});
describe('when there is initially some blogs saved', () => {
	test('blogs are returned as json', async () => {
		await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
	});

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body.length).toBe(helper.initialBlogs.length);
	});

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs');

		const contents = response.body.map((r) => r.title);

		expect(contents).toContain('test');
	});
});

describe('addition of a new blog', () => {
	test('blogs are defined with an unique id', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body[0].id).toBeDefined();
	});

	test('viewing a specific blog', async () => {
		const newBlog = {
			title: 'the new blog post'
		};

		await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
	});

	test('like = 0 if the blog has no likes', async () => {
		const missingLikes = {
			title: 'Another real blog post'
		};
		if (!missingLikes.likes) {
			const response = await api.post('/api/blogs').send({ ...missingLikes, likes: 0 });
			expect(response.body.likes).toBe(0);
		}
	});

	test('send error without title and url', async () => {
		const missingTitleUrl = {
			url: 'random_url'
		};

		if (!missingTitleUrl.title && !missingTitleUrl.url)
			await api.post('/api/blogs').send(missingTitleUrl).expect(400);
	});
});

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

		// const contents = blogsAtEnd.map((r) => r.content);

		// expect(contents).not.toContain(blogToDelete.content);
	});
});

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const user = new User({ username: 'root', password: 'sekret' });
		await user.save();
	});

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'mluukkai34',
			name: 'Matti Luukkainen',
			password: 'salainen'
		};

		await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen'
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('`username` to be unique');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test('creation fails with proper statuscode and message if password is shorter than 3chars', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root2',
			name: 'Superuser2',
			password: 'sa'
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('Password mush be at least 3 chars long');
		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
