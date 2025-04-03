import { findClientBySecret } from "../helpers/index.js"
import config from "../config/index.js"

export const validateClient = async (req, res, next) => {
    const secret = req.headers["x-client-secret"]
    if (!secret) {
        return res.status(400).json({ error: "Missing client secret" })
    }

    try {
        if (secret === config.clientSecret) {
            req.client = {
                CHAT_ID: req.body.chatId || config.chatId,
                TOKEN: req.body.botToken || config.botToken,
                STATUS: config.status,
            }
            return next()
        }

        const client = await findClientBySecret(secret)
        req.client = client
        next()

    } catch (err) {
        res.status(err.status || 401).json({ error: err.message || "Unauthorized" })
    }
}
