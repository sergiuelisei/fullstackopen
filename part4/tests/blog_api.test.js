const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const helper = require('./test_helper');

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(helper.initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(helper.initialBlogs[1]);
	await blogObject.save();
});

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

test('blogs are defined with an unique id', async () => {
	const response = await api.get('/api/blogs');
	expect(response.body[0].id).toBeDefined();
});

test('new blog is created successfully', async () => {
	const newBlog = {
		title: 'the new blog post'
	};

	await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
});

test('includes likes', async () => {
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

	if (!missingTitleUrl.title && !missingTitleUrl.url) await api.post('/api/blogs').send(missingTitleUrl).expect(400);
});

afterAll(() => {
	mongoose.connection.close();
});
