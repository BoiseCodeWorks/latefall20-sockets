<template>
  <div class="items-page container-fluid">
    <div class="row">
      <form class="col-12" @submit.prevent="createItem">
        <div class="form-group ">
          <input type="text"
                 class="form-control"
                 placeholder="title"
                 v-model="state.newItem.title"
          >
          <input type="text"
                 class="form-control"
                 placeholder="description"
                 v-model="state.newItem.description"
          >
          <input type="text"
                 class="form-control"
                 placeholder="price"
                 v-model="state.newItem.price"
          >
        </div>
        <button type="submit" class="btn btn-info">
          Create
        </button>
      </form>
    </div>
    <div class="row">
      <item v-for="item in items" :key="item._id" :item-prop="item" />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import { itemsService } from '../services/ItemsService'
import { onBeforeRouteLeave } from 'vue-router'
import socketService from '../services/SocketService'
export default {
  name: 'ItemsPage',
  setup() {
    const state = reactive({
      newItem: {}
    })
    onMounted(() => {
      itemsService.getAllItems()
    })
    onBeforeRouteLeave((to, from, next) => {
      socketService.leaveRoom('items')
      next()
    })
    return {
      state,
      items: computed(() => AppState.items),
      createItem() {
        itemsService.create(state.newItem)
      }
    }
  }
}
</script>

<style scoped>

</style>
