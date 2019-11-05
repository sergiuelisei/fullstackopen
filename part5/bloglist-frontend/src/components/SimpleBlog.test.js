import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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