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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}