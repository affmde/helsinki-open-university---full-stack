const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (a, b) => a+b
  const val = blogs.map(blog => blog.likes)
  const result = val.reduce(reducer, 0)
  return result
}

const mostLikesValue = (blogs) => {
  const val = blogs.map(blog => blog.likes)
  const result = Math.max(...val)
  return result
}

const betterArticleAuthor = (blogs) => {
  const val = blogs.map(blog => blog.likes)
  const index = val.indexOf(Math.max(...val))
  const result = blogs[index].author
  return result
}

const betterBlog = (blogs) => {
  const val = blogs.map(blog => blog.likes)
  const index = val.indexOf(Math.max(...val))
  const result = blogs[index]
  return result
}

const mostBlogs = (blogs) => {
  const authors = blogs.map( blog => blog.author)
  const blog = {}
  console.log(blog)
  //get object with authors and number of blogs
  authors.forEach(function (x) { blog[x] = (blog[x] || 0) + 1 })
  //get just array with values
  const count = Object.values(blog)
  const maxNumber = Math.max(...count)
  let result= Object.keys(blog).find(key => blog[key] === maxNumber)

  return { author: result, blogs: maxNumber }
}

const mostLikes = (blogs) => {
  const authorsCount = {}

  blogs.forEach((blog) => {
    const author = blog.author
    authorsCount[author]
      ? (authorsCount[author] += blog.likes)
      : (authorsCount[author] = blog.likes)
  })

  const count = Object.values(authorsCount)
  const maxNumber = Math.max(...count)
  let result= Object.keys(authorsCount).find(key => authorsCount[key] === maxNumber)

  return { author: result, likes: maxNumber }
}


module.exports = {
  dummy,
  totalLikes,
  mostLikesValue,
  betterArticleAuthor,
  betterBlog,
  mostBlogs,
  mostLikes
}