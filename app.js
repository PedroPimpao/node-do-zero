import { fastify } from 'fastify'
import { DatabaseMemory } from './dbMemory.js'
import { DatabasePostgres } from './db-postgresql.js'
import 'dotenv/config'

const app = fastify()
const db = new DatabasePostgres()

app.get('/', ()=>{
    return 'Hello, World!!!'
})

app.post('/videos', async (req, res)=>{
    const {title, description, duration} = req.body
    
    await db.create({
        title,
        description,
        duration
    })
    
    return res.status(201).send()
})

app.get('/videos', async (req, res)=>{
    const search = req.query.search

    console.log(search)

    const videos = await db.list(search)
    return videos
})


app.put('/videos/:id', async (req, res)=>{
    const videoId = req.params.id
    const {title, description, duration} = req.body

    await db.update(videoId, {
        title, 
        description,
        duration  
    })

    return res.status(204).send()
})

app.delete('/videos/:id', async (req, res)=>{
    const videoId = req.params.id

    await db.delete(videoId)
    return res.status(204).send()
})

app.listen({
    port: process.env.PORT ?? 3000,
})