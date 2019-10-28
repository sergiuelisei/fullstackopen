const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response, next) => {
	const blog = await Blog.findById(request.params.id);
	try {
		if (blog) {
			response.json(blog.toJSON());
		} else {
			response.status(404).end();
		}
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.post('/', async (request, response, next) => {
	const blog = new Blog(request.body);
	try {
		const savedBlog = await blog.save();
		response.json(savedBlog.toJSON());
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		await Blog.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.put('/:id', async (request, response, next) => {
	const body = request.body;
	try {
		if (!body.likes || !body.title || !body.author || !body.url) {
			return request.status(400).json({
				error: 'content missing'
			});
		}

		const blog = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes
		};

		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
		response.json(updatedBlog.toJSON());
	} catch (error) {
		next(error);
	}
});

module.exports = blogsRouter;
