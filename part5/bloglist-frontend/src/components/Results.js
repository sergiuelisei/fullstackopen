import React from 'react'
import Blog from './Blog'


const Results = ({ handleLike, blogs, handleRemove }) => {
    const elements = blogs.sort((a, b) => b.likes - a.likes).map(blog => {
        return (
            <Blog key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
            />
        )
    })

    return (
        <div>



            {elements}
        </div>
    )
}

export default Results 