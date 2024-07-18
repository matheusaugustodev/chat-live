const chatArea = document.querySelector('.chat-area')
const chatSend = document.querySelector('.chat-send')
const btnSend = document.querySelector('#btn-send')
const textarea = document.querySelector('#textarea')

let socket
let usersConnected

const dados = {
    username: '',
    socketid: ''
}

const btnJoin = document.querySelector('#btn-join')
btnJoin.addEventListener('click', join)

const inputJoin = document.querySelector('#input-join')
inputJoin.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) join()
})

btnSend.addEventListener('click', sendMessage)
textarea.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) sendMessage()
})

function sendMessage() {
    const message = textarea.value.trim()
    if (message == '') return
    socket.emit('send-message', {
        message, socketid: dados.socketid, name: dados.username
    })
    textarea.value = ''
}

function join() {
    const inputJoin = document.querySelector('#input-join')
    const name = inputJoin.value.trim()
    if (name == '') return
    dados.username = name
    boot()
}

function boot() {
    const name = dados.username
    const welcome = document.querySelector('.welcome')
    welcome.innerHTML = `Bem-vindo (a) ao chat ao vivo, ${name}!`

    socket = io(window.location.href)
    socket.emit('join', name)

    socket.on('name-exist', info => {

        if (info.verify) {
            alert('Esse nome já está sendo usado. Tente outro!')
            return
        }
        
        dados.socketid = info.socketid
        
        const areaJoin = document.querySelector('.join')
        areaJoin.remove()

        socket.emit('logged', name)
    })
    socket.on('update-user', infos => {

    })

    socket.on('load-message', info => { loadMessage(info) })
}

function loadMessage(info) {
    const { message, socketid, name } = info
    
    const classMe = dados.socketid == socketid ? 'send-me' : ''
    const nameMe = dados.username == name ? 'Eu' : name
    chatArea.innerHTML += `
        <div class="area-message ${classMe}">
            <div class="from">${nameMe}</div>
            <div class="message">${message}</div>                
        </div>
    `
}