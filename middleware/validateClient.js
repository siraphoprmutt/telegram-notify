import { findClientBySecret } from "../helpers/index.js"

export const validateClient = async (req, res, next) => {
    const secret = req.headers["x-client-secret"]
    if (!secret) {
        return res.status(400).json({ error: "Missing client secret" })
    }

    try {
        const client = await findClientBySecret(secret)
        req.client = client
        next()
    } catch (err) {
        res.status(err.status || 401).json({ error: err.message || "Unauthorized" })
    }
}
