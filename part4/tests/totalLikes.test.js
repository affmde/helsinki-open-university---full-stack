const listHelper = require('../utils/list_helper')
const blogs = require('../utils/blogsList')

describe('total likes ', () => {
  test('sum of two numbers', () => {
    expect(1+2).toBe(3)
  })

  test('sum of likes from array', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

  test('most likes', () => {
    expect(listHelper.mostLikesValue(blogs)).toBe(12)
  })

  test('name of author who wrote the most liked blog', () =>{
    expect(listHelper.betterArticleAuthor(blogs)).toBe('Edsger W. Dijkstra')
  })
})

describe('Favorite food', () => {
  test('blog with most likes', () => {
    const expected ={
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
    expect(listHelper.betterBlog(blogs)).toEqual(expected)
  })
})

describe('Most blogs', () => {
  test('author with more likes', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('Most likes', () => {
  test('author with the most likes of all', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})