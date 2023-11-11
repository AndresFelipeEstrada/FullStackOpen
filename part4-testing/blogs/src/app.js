import config from "./utils/config.js"
import { connect } from "mongoose";
import express from 'express'
const app = express()
import cors from 'cors'
import blogsRouter from "./controller/blogs.js";
import middlewares from "./utils/middlewares.js";
import logger from "./utils/logger.js";

connect(config.URL)
  .then(_ => logger.info("conectado a la base de datos"))
  .catch(error => logger.error(error))


app.use(cors())
app.use(express.json())
app.use(middlewares.requestLogger)

app.use("/api/blogs", blogsRouter)


app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)

export default app
