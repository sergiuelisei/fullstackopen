import React from 'react'
import Blog from './Blog'


const Results = ({ handleLike, blogs }) => {
    const elements = blogs.map(blog => {
        return (
            <Blog key={blog.id}
                blog={blog}
                handleLike={handleLike}
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