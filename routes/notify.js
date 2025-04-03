import { Router } from "express"
import TelegramBot from "node-telegram-bot-api"
import { validateClient } from "../middleware/validateClient.js"

const router = Router()

router.use(validateClient)
router.post("/", async (req, res) => {
    try {
        const { message } = req.body
        const client = req.client

        const bot = new TelegramBot(client.TOKEN, { polling: false })
        await bot.sendMessage(client.CHAT_ID, message)

        res.status(200).json({ success: true })
    } catch (err) {
        console.error("[Error]", err.message || err)
        res.status(err.status || 500).json({ error: err.message || "Internal Server Error" })
    }
})

export default router
