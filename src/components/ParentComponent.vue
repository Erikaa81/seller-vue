<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Waiting from '../components/Waiting.vue';
import OrderDetails from '../components/OrderDetails.vue';

const selectedStoreId = ref<number | null>(null);
const route = useRoute();

onMounted(() => {
  if (route.params.storeId) {
    selectedStoreId.value = Number(route.params.storeId);
  }
});
</script>

<template>
  <div>
    <h1>Story</h1>
    <h2>Aguardando pedido...</h2>

  </div>
  <main>
    <Waiting :storeId="selectedStoreId" />
    <OrderDetails :storeId="selectedStoreId" />
  </main>
</template>