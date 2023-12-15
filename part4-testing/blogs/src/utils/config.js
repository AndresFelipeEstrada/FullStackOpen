import "dotenv/config.js";

const PORT = process.env.PORT
const URL = process.env.NODE_ENV === "development" ? process.env.URL_DB_TEST : process.env.URL_DB


export default {
  PORT, URL
}
