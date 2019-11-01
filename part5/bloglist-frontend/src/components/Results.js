import React from 'react'
import Blog from './Blog'


const Results = ({ user, blogs, handleLogout }) => {
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
            <h2>blogs</h2>
            <p>{`${user.name} logged in`}
                <button onClick={handleLogout}>Logout</button>
            </p>


            {elements}
        </div>
    )
}

export default Results 