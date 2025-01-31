// import { createServer } from "node:http"

// const server = createServer((req , res) => {
//     // req trás os dados da requisição (email, senha, nome de usuário, etc)
//     //  res é o objeto utilizado para devolver uma resposta
//     res.write("Hello world")
    
//     return res.end()
// })

// server.listen(3333)

import {fastify} from "fastify"

// import { DatabaseMemory } from "./database-memory.js"

import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()
// GET, POST, PUT, DELETE, PATCH

const database = new DatabasePostgres()

// Request Body
server.post("/videos", async (req, res) => {
    const body = req.body

    const { title, description, duration } = body;

    await database.create({
        title,
        description,
        duration,
    })

    return res.status(201).send();
    
})

server.get("/videos", async (req) => {
    const search = req.query.search

    const videos = await database.list(search);
    

    return videos;
})

// Route Parameter
server.put("/videos/:id", async (req, res) => {
    const videoId = req.params.id

    const body = req.body

    const { title, description, duration } = body;

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return res.status(204).send()
})

server.delete("/videos/:id", async (req, res) => {
    const videoId = req.params.id;

    await database.delete(videoId)

    return res.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})