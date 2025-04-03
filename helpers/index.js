import { clients } from '../data/index.js'

export const findClientBySecret = async (secret) => {
    if (!Array.isArray(clients)) {
        throw { status: 500, message: 'Invalid client data format' }
    }

    const client = clients.find(
        (c) => c.CLIENT_SECRET === secret && c.STATUS === true
    )

    if (!client) {
        throw { status: 401, message: 'Unauthorized or inactive client' }
    }

    return client
}
