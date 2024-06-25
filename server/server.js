import express from 'express'
const server = express()

server.use(express.static('build'))


server.get('/');
console.log(1)


server.listen(8080)