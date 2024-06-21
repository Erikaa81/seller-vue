<script setup lang="ts">
import type { Order } from '../types'
import { ref,onUnmounted } from 'vue'
import axios from 'axios'

const props = defineProps<{
  order?: Order
}>()

const orders = ref<Order[]>([])

if (props.order) {
  orders.value.push(props.order)
}


const acceptOrder = async (orderId: number) => {
  try {
    await axios.post(`/orders/${orderId}/approve`)
    updateOrderStatus(orderId, 'approved')
    console.log(`Order ${orderId} accepted`)
    alert('Pedido aprovado e pagamento iniciado.')
  } catch (error) {
    console.error('Erro ao aprovar o pedido')
  }
}

const rejectOrder = (orderId: number) => {
  console.log(`Order ${orderId} rejected`)
}

const updateOrderStatus = (orderId: number, status: string) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.state = status
    order.payment = true 
  }
}

const handleNewOrder = (event: CustomEvent) => {
  const newOrder = {
    ...event.detail,
    createdAt: new Date(event.detail.created_at),
    updatedAt: new Date(event.detail.updated_at),
  }
  orders.value.push(newOrder)
  console.log('New order received:', newOrder)
}

onUnmounted(() => {
 handleNewOrder
})
</script>

<template>
  <main>
    <div v-for="order in orders" :key="order.id">
      <h2>Order {{ order.id }} [{{ order.createdAt.toLocaleDateString() }}]</h2>
      <div v-for="item in order.order_items_attributes" :key="item.product_id">
        <p>Product: {{ item.product_id }}</p>
      </div>
      <p v-if="order.payment">Payment Status: Paid</p>
      <p v-else>Payment Status: Not Paid</p>
      <p>Status: {{ order.state }}</p>
      <button @click="() => acceptOrder(order.id)" v-if="order.state === 'created'">Accept</button>
      <button @click="() => rejectOrder(order.id)" v-if="order.state === 'created'">Reject</button>
    </div>
  </main>
</template>