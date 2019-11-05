import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove }) => {
	const [visible, setVisible] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const handleVisibleEvent = () => setVisible(!visible)

	const showWhenVisibleStyle = {
		display: visible ? '' : 'none'
	}



	return (
		<div style={blogStyle}>
			<div onClick={handleVisibleEvent} className='partialBlog'>
				<div>{blog.title}</div>
				<div>{blog.author}</div>
			</div>

			<div style={showWhenVisibleStyle} className='fullBlog'>
				<div>
					<div >
						<a href={blog.url}>{blog.url}</a>
					</div>
					<div>
						{blog.likes} likes
						<button value={blog.id} onClick={() => handleLike({ blog })} >
							like
						</button>
					</div>
					<div>
						added by {blog.user.name}
						<button value={blog.id} onClick={handleRemove} >
							remove
						</button>

					</div>
				</div>
			</div>
		</div>
	)
}


export default Blog