import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
      <div onClick={handleVisibleEvent}>
        {blog.title} {blog.author}
      </div>

      <div style={showWhenVisibleStyle}>
        <div>
          <div >
            <a href='https://www.google.com'>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes
             <button value={blog.id} >
              like
            </button>
          </div>
          <div>
            {/* added by {(blog.user.name) ? blog.user.name : 'name not found'} */}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Blog