export default {
    clientSecret: process.env.CLIENT_SECRET,
    chatId: process.env.CHAT_ID,
    botToken: process.env.BOT_TOKEN,
    status: process.env.STATUS === "false" ? false : true,
    mode: process.env.MODE || "development",
    port: process.env.PORT || 8080,
}
