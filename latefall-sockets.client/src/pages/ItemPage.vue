<template>
  <div class="itemPage  container-fluid">
    <div class="row">
      <div class="offset-3 col-6 card mt-3">
        <h3>
          {{ item.title }}
        </h3>
        <h5>{{ item.description }}</h5>
        <p>
          {{ item.price }}
        </p>
        <button @click="deleteItem" class="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import { itemsService } from '../services/ItemsService'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import socketService from '../services/SocketService'
export default {
  name: 'ItemPage',
  setup() {
    const route = useRoute()
    const state = reactive({

    })
    onMounted(() => {
      itemsService.getItemById(route.params.id)
    })
    onBeforeRouteLeave((to, from, next) => {
      socketService.leaveRoom('items-' + route.params.id)
      next()
    })
    return {
      state,
      item: computed(() => AppState.item),
      deleteItem() {
        itemsService.deleteItem(route.params.id)
      }
    }
  }
}
</script>

<style scoped>

</style>
