import SocketIO from 'socket.io'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger'
class SocketService {
  io = SocketIO();
  /**
   * @param {SocketIO.Server} io
   */
  setIO(io) {
    try {
      this.io = io
      // Server listeners
      io.on('connection', this._onConnect())
    } catch (e) {
      logger.error('[SOCKETSTORE ERROR]', e)
    }
  }

  /**
   * @param {SocketIO.Socket} socket
   * @param {string} room
   */
  JoinRoom(socket, room) {
    socket.join(room)
  }

  /**
   * @param {SocketIO.Socket} socket
   * @param {string} room
   */
  LeaveRoom(socket, room) {
    socket.leave(room)
  }

  /**
   * Sends a direct message to a user
   * @param {string} userId
   * @param {string} eventName
   * @param {any} payload
   */
  messageUser(userId, eventName, payload) {
    try {
      this.io.to(userId).emit(eventName, payload)
    } catch (e) {}
  }

  // socketService.messageRoom('items', 'editedItem', editedItem)
  // socketService.messageRoom('items', 'newItem', created)
  // socketService.messageRoom('items-' + req.params.id, 'deletedItem', 'deleted')
  messageRoom(room, eventName, payload) {
    this.io.to(room).emit(eventName, payload)
  }

  _onConnect() {
    return socket => {
      this._newConnection(socket)

      // STUB Register listeners

      socket.on('dispatch', this._onDispatch(socket))
      socket.on('disconnect', this._onDisconnect(socket))
    }
  }

  _newConnection(socket) {
    // Handshake / Confirmation of Connection
    socket.emit('CONNECTED', {
      socket: socket.id,
      message: 'Successfully Connected'
    })
  }

  _onDispatch(socket) {
    // dispatchs from client will have to have an action that matches method in this file
    // payload => { action: 'JoinRoom', data: roomName }
    return (payload = {}) => {
      try {
        const action = this[payload.action]
        if (!action || typeof action !== 'function') {
          return socket.emit('error', 'Unknown Action')
        }
        action.call(this, socket, payload.data)
      } catch (e) {}
    }
  }

  _onDisconnect(socket) {
    return () => {
      try {
        if (!socket.userInfo) {
          return
        }
        this.io.emit('UserDisconnected', socket.userInfo.id)
      } catch (e) {}
    }
  }

  /**
   * @param {SocketIO.Socket} socket
   */
  async Authenticate(socket, bearerToken) {
    try {
      const userInfo = await Auth0Provider.getUserInfoFromBearerToken(bearerToken)
      // @ts-ignore
      socket.userInfo = userInfo
      socket.join(userInfo.id)
      socket.emit('AUTHENTICATED')
      this.io.emit('UserConnected', userInfo.id)
    } catch (e) {
      socket.emit('error', e)
    }
  }
}

const socketService = new SocketService()

export default socketService
