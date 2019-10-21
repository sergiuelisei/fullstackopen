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

const mostLikes = (blogs) => {
  const sorted = _.groupBy(blogs, 'author')
  const myList = []
  _.forOwn(sorted, (value, key) => {
    myList.push({
      author: key,
      likes: value.reduce((acc, blog) => acc + blog.likes, 0)
    })
  })
  return _.maxBy(myList, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}