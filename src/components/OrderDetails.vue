<script setup lang="ts">
import type { Order } from '../types'
import { ref } from 'vue'

const props = defineProps<{
  order?: Order
}>()

const orders = ref<Order[]>([])

if (props.order) {
  orders.value.push(props.order)
}

const acceptOrder = (orderId: number) => {
  console.log(`Order ${orderId} accepted`)
}

const rejectOrder = (orderId: number) => {
  console.log(`Order ${orderId} rejected`)
}
</script>

<template>
  <main>
    <div v-for="order in orders" :key="order.id">
      <h2>Order {{ order.id }} [{{ new Date(order.createdAt).toLocaleDateString() }}]</h2>
      <div v-for="item in order.order_items_attributes" :key="item.product_id">
        <p>Product: {{ item.product_id }}</p>
      </div>
      <button @click="acceptOrder(order.id)">Accept</button>
      <button @click="rejectOrder(order.id)">Reject</button>
    </div>
  </main>
</template>
