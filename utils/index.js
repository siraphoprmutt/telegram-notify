import fs from 'fs/promises'
import path from 'path'

export const readJSONFile = async (relativePath) => {
    const filePath = path.join(process.cwd(), relativePath)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

export const writeJSONFile = async (relativePath, jsonData) => {
    const filePath = path.join(process.cwd(), relativePath)
    const data = JSON.stringify(jsonData, null, 2)
    await fs.writeFile(filePath, data, 'utf-8')
}
