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


module.exports = {
  dummy,
  totalLikes
}