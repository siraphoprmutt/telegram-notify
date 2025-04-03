import { Router } from "express"
import notifyRoute from "./notify.js"

const router = Router()

// root route
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Telegram Bot API",
    })
})

// other routes
router.use("/notify", notifyRoute)

export default router
