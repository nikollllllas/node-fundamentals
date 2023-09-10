import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
    #videos = new Map()

    async list(search) {
        let videos 

        if (search) {
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from videos`
        }

        return videos
    }

    async create(video) {
        const videoId = randomUUID() 
        const { title, description, duration } = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${video.title}, ${video.description}, ${video.duration})`
    }

    async update(id, video) {
        const { title, description, duration } = video

        await sql`UPDATE videos SET title = ${video.title}, description = ${video.description}, duration = ${video.duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`
    }
}