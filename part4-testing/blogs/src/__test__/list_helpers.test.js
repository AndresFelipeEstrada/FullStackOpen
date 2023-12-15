import app from "../app";
import supertest from "supertest";
import list_helpers from "../utils/list_helpers";
import { Blog } from "../models/blogs";

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const createBlog = list_helpers.listBlogs.map(blog => new Blog(blog))
  const saveBlog = createBlog.map(b => b.save())
  await Promise.all(saveBlog)
});

describe("GET /api/blogs", () => {
  test("GET", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
    expect(response.body).toHaveLength(list_helpers.listBlogs.length)
  })

  test("Existe la propiedad id", async () => {
    const response = await api.get("/api/blogs").expect(200)
    const firstBlog = response.body[0]
    expect(firstBlog.id).toBeDefined()
  })

})

describe('POST /api/blogs', () => {
  test("Create new blog", async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10
    }
    await api.post("/api/blogs")
      .send(newBlog)
      .expect(201)

    const response = await api.get("/api/blogs")
    expect(response.body.map(blog => blog.author)).toContain("Edsger W. Dijkstra")
    expect(response.body).toHaveLength(list_helpers.listBlogs.length + 1)
  })

  test("Falta una propiedad al crear un blog", async () => {
    const newBlogWithoutLikes = {
      title: "prueba",
      author: "Andres",
      url: "http://www.andres.com"
    }
    const response = await api.post("/api/blogs")
      .send(newBlogWithoutLikes)
      .expect(400)
    expect(response.body.error).toEqual("faltan datos")
  })


  test("Faltan las propiedades title y url", async () => {
    const newBlogWithoutTitleAndUrl = {
      author: "prueba"
    }

    await api.post("/api/blogs")
      .send(newBlogWithoutTitleAndUrl)
      .expect(400)

    const blogsAtEnd = await api.get("/api/blogs")
    expect(blogsAtEnd.body).toHaveLength(list_helpers.listBlogs.length)
  })
})




