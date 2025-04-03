import express from "express"
import dotenv from "dotenv"
import routes from "./routes/index.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// load routes
app.use("/", routes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
