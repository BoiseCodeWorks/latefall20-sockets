import io from 'socket.io-client'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import router from '../router'

let socket = {}
class SocketService {
  initializeSocket() {
    socket = io('//localhost:3000/')

    socket.on('CONNECTED', data => {
      logger.log(data.message + ' Let the villany commence')
    })
    // NOTE REGISTER ADDITIONAL LISTENERS
    socket.on('editedItem', data => {
      logger.log(data)
      const iInd = AppState.items.findIndex(i => i._id === data._id)
      AppState.items.splice(iInd, 1, data)
    })
    socket.on('newItem', data => {
      logger.log(data)
      AppState.items = [...AppState.items, data]
    })
    socket.on('deletedItem', data => {
      logger.log(data)
      router.push({ name: 'Items' })
    })
  }

  joinRoom(roomName) {
    socket.emit('dispatch', { action: 'JoinRoom', data: roomName })
  }

  leaveRoom(roomName) {
    socket.emit('disconnect', { action: 'LeaveRoom', data: roomName })
  }
}

const socketService = new SocketService()

export default socketService
