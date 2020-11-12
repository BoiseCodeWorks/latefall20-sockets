import { AppState } from '../AppState'
import { api } from './AxiosService'
// import router from '../router'

class ItemsService {
  async getAllItems() {
    const res = await api.get('/api/items')
    AppState.items = res.data
  }

  async getItemById(id) {
    const res = await api.get('/api/items/' + id)
    AppState.item = res.data
  }

  bid(itemId) {
    api.put(`/api/items/${itemId}`)
    // const iInd = AppState.items.findIndex(i => i._id === itemId)
    // AppState.items.splice(iInd, 1, res.data)
  }

  create(item) {
    api.post('/api/items', item)
    // const iInd = AppState.items.findIndex(i => i._id === res.data._id)
    // AppState.items.splice(iInd, 1, res.data)
  }

  deleteItem(itemId) {
    api.delete('/api/items/' + itemId)
    // router.push({ name: 'Items' })
  }
}
export const itemsService = new ItemsService()
