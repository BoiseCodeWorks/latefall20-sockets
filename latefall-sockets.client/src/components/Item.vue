<template>
  <div class="item col-3" @click="viewItem">
    <div class="card text-center">
      <div class="card-body">
        <h4 class="card-title">
          {{ itemProp.title }}
        </h4>
        <p class="card-text">
          {{ itemProp.description }}
        </p>
        <p>{{ itemProp.price }}</p>
        <button @click.stop="bid()" class="btn btn-primary">
          Bid
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { itemsService } from '../services/ItemsService'
import { useRouter } from 'vue-router'
export default {
  name: 'Item',
  props: ['itemProp'],
  setup(props) {
    const router = useRouter()
    return {
      bid() {
        itemsService.bid(props.itemProp._id)
      },
      viewItem() {
        router.push({ name: 'Item', params: { id: props.itemProp._id } })
      }
    }
  }
}
</script>

<style scoped>

</style>
