import { itemsService } from '../services/ItemsService'
import socketService from '../services/SocketService'
import BaseController from '../utils/BaseController'

export class ItemsController extends BaseController {
  constructor() {
    super('api/items')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.deleteItem)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await itemsService.find())
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      return res.send(await itemsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    const editedItem = await itemsService.edit(req.params.id)
    socketService.messageRoom('items', 'editedItem', editedItem)
    res.send(editedItem)
  }

  async create(req, res, next) {
    try {
      const created = await itemsService.create(req.body)
      socketService.messageRoom('items', 'newItem', created)
      res.send(created)
    } catch (error) {
      next(error)
    }
  }

  async deleteItem(req, res, next) {
    try {
      await itemsService.delete(req.params.id)
      socketService.messageRoom('items-' + req.params.id, 'deletedItem', 'deleted')
      res.send('Delorted')
    } catch (error) {
      next(error)
    }
  }
}
