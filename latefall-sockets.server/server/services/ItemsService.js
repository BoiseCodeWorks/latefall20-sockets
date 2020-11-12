import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ItemsService {
  async delete(id) {
    return await dbContext.Items.findByIdAndRemove(id)
  }

  async edit(id) {
    const item = await dbContext.Items.findByIdAndUpdate(id, { $inc: { price: 50 } }, { new: true })
    return item
  }

  async find(query = {}) {
    const items = await dbContext.Items.find(query)
    return items
  }

  async findById(id) {
    const item = await dbContext.Items.findById(id)
    if (!item) {
      throw new BadRequest('Invalid Id')
    }
    return item
  }

  async create(body) {
    return await dbContext.Items.create(body)
  }
}

export const itemsService = new ItemsService()
