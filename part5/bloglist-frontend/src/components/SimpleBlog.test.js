import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
	const blog = {
		title: 'testing a component',
		author: 'Sergiu',
		likes: 1
	}

	const component = render(
		<SimpleBlog blog={blog} />
	)

	expect(component.container).toHaveTextContent('testing a component')
	expect(component.container).toHaveTextContent('Sergiu')
	expect(component.container).toHaveTextContent(1)

})

test('clicking the like button twice calls event handler twice', () => {
	const blog = {
		title: 'testing a component',
		author: 'Sergiu',
		likes: 1
	}

	const mockHandler = jest.fn()

	const { getByText } = render(
		<SimpleBlog blog={blog} onClick={mockHandler} />
	)

	const button = getByText('like')
	fireEvent.click(button)
	fireEvent.click(button)

	expect(mockHandler.mock.calls.length).toBe(2)
})