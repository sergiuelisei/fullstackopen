import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
	let component
	const mockHandler = jest.fn()

	const blog = {
		title: 'Component testing tutorial',
		author: 'John',
		likes: 0,
		user: ['']
	}

	beforeEach(() => {
		component = render(
			<Blog
				blog={blog}
				handleLike={mockHandler}
				handleRemove={mockHandler} />
		)
	})

	test('at start the children are not displayed', () => {
		const div = component.container.querySelector('.fullBlog')

		expect(div).toHaveStyle('display: none')
	})

	test('after clicking the button, children are displayed', () => {
		const partialBlog = component.container.querySelector('.partialBlog')
		fireEvent.click(partialBlog)

		const div = component.container.querySelector('.fullBlog')
		expect(div).not.toHaveStyle('display: none')
	})

})	