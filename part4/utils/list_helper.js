const _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}
const totalLikes = (blogs) =>{

  if (blogs.length === 0 ) return 0
  
  const result = blogs.reduce((a,b) => {
    return { likes: a.likes + b.likes }
  })
    
  return result.likes

}

const favoriteBlog = (blogs) => {
   if(blogs.length === 0 ) return {}
   return blogs.reduce((highest, blog) => 
   highest.likes > blog.likes ? { 
    title : highest.title, 
    author: highest.author,
    likes: highest.likes
   } : {
    title : blog.title, 
    author: blog.author,
    likes: blog.likes
    })
}

const mostBlogs = (blogs) => {
  const sorted = _.countBy(blogs, 'author')
  const listed = []
  _.forOwn(sorted, (value, key) => {
    listed.push({
      author: key,
      blogs: value
    })
  })
  return _.maxBy(listed, 'blogs')
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}