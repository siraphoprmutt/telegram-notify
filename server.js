import express from "express"
import dotenv from "dotenv"
import config from "./config/index.js"
import routes from "./routes/index.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", routes)

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`)
})
