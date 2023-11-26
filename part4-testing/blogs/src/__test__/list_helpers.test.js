import listHelpers from "../utils/list_helpers.js"


const listBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Meotodos javascript',
    author: 'Midudev',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
  },
]

test("dummy return one", () => {
  const blogs = []

  const result = listHelpers.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {


  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelpers.totalLikes(listBlogs)
    expect(result).toBe(20)
  })

})

describe("Most Likes", () => {

  test("Que blog tiene mas likes", () => {
    const result = listHelpers.favoriteBlog(listBlogs)
    expect(result).toEqual(10)
  })
})


describe("Author with the most blogs", () => {

  test("Hope the author return with more blogs", () => {
    const result = listHelpers.mostBlogs(listBlogs)
    console.log(result)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 3 })
  })
})

describe("mostLikes", () => {
  test("autor con mas likes en total", () => {
    const result = listHelpers.mostLikes(listBlogs)
    expect(result).toEqual({ author: "Edsger W. Dijkstra", total: 20 })
  })
})
