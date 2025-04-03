import express from "express";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { findClientBySecret } from "./helpers/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Telegram Bot API",
    })
});

app.post("/notify", async (req, res) => {
    try {
        const secret = req.headers["x-client-secret"];
        if (!secret) {
            return res.status(400).json({ error: "Missing client secret" });
        }
        const { message } = req.body;
        const client = await findClientBySecret(secret)

        if (!message) {
            return res.status(400).json({ error: 'Missing message' })
        }

        const bot = new TelegramBot(client.TOKEN, { polling: false })
        await bot.sendMessage(client.CHAT_ID, message)

        res.status(200).json({ success: true })
    } catch (err) {
        console.error("[Error]", err.message || err);
        res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
    }
})

app.listen(port, () => {
    `Server started on port ${port}`;
});