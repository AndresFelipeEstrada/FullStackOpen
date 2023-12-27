import jwt from "jsonwebtoken"
import { Router } from "express"
import { Blog } from "../models/blogs.js"
import { User } from "../models/users.js"

const blogsRouter = Router()

blogsRouter.get('/', async (_, res) => {
  try {
    const allUsersWithBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    if (!allUsersWithBlogs) return res.status(400)

    return res.status(200).json(allUsersWithBlogs).end()
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title || !author || !url) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token erróneo' });
  }

  try {
    const user = await User.findById(decodedToken.id);

    const newBlog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await newBlog.save();

    // Actualiza el array de blogs del usuario
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog).end();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token erróneo' });
  }

  try {
    const user = await User.findById(decodedToken.id);

    if (!user) return res.json({ error: 'Usuario no encontrado' })

    const blog = await Blog.findById(id).exec()

    if (!blog) {
      return res.status(404).json({ error: 'Blog no encontrado' })
    }

    if (blog.user.toString() !== user.id.toString()) {
      return res.json({ error: 'El id del usuario no concuerda con el usuario que creo el blog' })
    }

    await Blog.deleteOne({ _id: id })
    return res.status(204).json('Blog eliminado').end()
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Error interno del servidor' });
  }
})

export default blogsRouter
