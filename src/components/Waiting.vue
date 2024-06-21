<script setup lang="ts">
import { ref, watch} from 'vue';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import type { Order} from '../types';
import { auth } from '../auth';
import OrderDetails from './OrderDetails.vue';

const props = defineProps<{
  storeId: number | null;
}>();

const currentUser = auth.currentUser();
const newOrder = ref<Order | null>(null);
const hasNewOrder = ref(false);

watch(() => props.storeId, (storeId) => {
  if (storeId !== null) {
    let path = `${import.meta.env.VITE_API_HOST}/stores/${storeId}/orders/new`;
    console.log(path);

    fetchEventSource(path, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': import.meta.env.X_API_KEY,
        'Authorization': `Bearer ${currentUser?.token}`
      },
      async onopen(response) {
        console.log("onopen event triggered");
        if (response.ok) {
          console.log("Connection established successfully.")
          return;
        }
      },
      onmessage(msg) {
        console.log("Received message:", msg);
        if (msg.event === 'new-order') {
          let data = JSON.parse(msg.data);
          console.log(data.order);
          newOrder.value = {
            id: data.order.id,
            buyer_id: data.order.buyer_id,
            order_items_attributes: data.order.order_items_attributes,
            state: data.order.state,
            createdAt: new Date(data.order.created_at),
            updatedAt: new Date(data.order.updat_at),
            payment: data.order.payment

          };
          console.log("New order updated:", newOrder.value);
          hasNewOrder.value = true;
        } else {
          console.log("No new order message received.");
          hasNewOrder.value = false;
        }
      }
    });
  }
});

</script>

<template>
  <div v-if="storeId !== null">
   <template v-if="hasNewOrder">
      <div>
        <p>New order!</p>
      </div>
      <OrderDetails :order="newOrder"/>
    </template>
  </div>
</template>
