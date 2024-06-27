import express from 'express'
const server = express()

server.use(express.static('build'))


server.get('/');


server.listen(8080)