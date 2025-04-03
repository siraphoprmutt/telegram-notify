import { Router } from "express"
import fs from "fs"
import path from "path"

const router = Router()
const __dirname = path.resolve()

const routesPath = path.join(__dirname, "routes")

fs.readdirSync(routesPath).forEach(async (file) => {
    const fileName = path.parse(file).name
    const fileExt = path.parse(file).ext

    if (fileName === "index" || fileExt !== ".js") return

    const route = await import(`./${file}`)
    router.use(`/${fileName}`, route.default)
})

// Root route
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Telegram Bot API",
    })
})

export default router
