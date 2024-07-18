const express = require('express')
const http = require('http')
const path = require('path')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const APP_PORT = process.env.APP_PORT || 8080
const APP_URL = process.env.URL || `http://localhost:${APP_PORT}`

app.use(express.static(path.join(__dirname, 'view')))

const usersConnected = []
const sockesConnected = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html')
})

server.listen(APP_PORT, () => console.log(`Servidor rodando na porta ${APP_PORT}! \n${APP_URL}`))

io.on('connection', (socket) => {

    socket.on('join', name => {
        const exist = usersConnected.find(item => item.name == name)
        
        const verify = exist ? true : false
        socket.emit('name-exist', {verify, socketid: socket.id})
    })

    socket.on('logged', name => {
        usersConnected.push({name: name, socketid: socket.id})
        sockesConnected.push(socket)
    })

    socket.on('send-message', info => 
        sockesConnected.forEach(item => item.emit('load-message', info))
    )

    socket.on('disconnect', () => {
        usersConnected = usersConnected.filter(item => item.socketid != socket.id)
        sockesConnected = sockesConnected.filter(item => item != socket)
    })
})

module.exports = app