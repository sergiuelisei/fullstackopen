import React from 'react'
import Blog from './Blog'


const Results = ({ user, blogs }) => {
    const elements = blogs.map(blog => {
        return (
            <Blog key={blog.id}
                blog={blog}
                user={user}
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