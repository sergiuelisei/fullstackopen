import React from 'react'

const AddNewBlog = ({ handleTitleChange, handleAuthorChange, handleUrlChange, handleAddBlog }) => {
  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type='text'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default AddNewBlog;