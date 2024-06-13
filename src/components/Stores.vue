<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { stores } from '../stores'
import type { Store } from '../types';

const storeName = ref('')
const message = ref('')

const alertType = ref('')
const userStores = ref()
const storesMessage = ref('')
const waiting = ref<Store>()
const selectedStoreId = ref<number | null>(null);

function waitOrders(store: Store) {
  selectedStoreId.value = store.id;
  router.push({ name: 'DetalhesPedido', params: { id: store.id } });
}

const router = useRouter()

const handleSubmit = async () => {
  try {
    const response = await stores.newStore(storeName.value)
    if (response.success) {
      message.value = response.message || 'Loja criada com sucesso!'
      alertType.value = 'success'
      await fetchStores()
    } else {
      message.value = response.message || 'Falha ao criar loja.'
      alertType.value = 'danger'
    }
  } catch (error) {
    message.value = 'Erro ao criar loja.'
    alertType.value = 'danger'
  }
}

const fetchStores = async () => {
  try {
    const response = await stores.getStores()
    if (response.stores && response.stores.length) {
      userStores.value = response.stores
    } else {
      storesMessage.value = response.message || 'Falha ao obter lojas.'
    }
  } catch (error) {
    storesMessage.value = 'Erro ao obter lojas.'
  }
}

const editStore = (storeId: number) => {
  router.push({ name: 'editStore', params: { id: storeId, name: storeName.value } })
}

const handleDeleteStore = async (storeId: number) => {
  try {
    await stores.deleteStore(storeId)
    userStores.value = userStores.value.filter((store: { id: number; }) => store.id !== storeId) 
    message.value = 'Loja excluída com sucesso.'
    alertType.value = 'success'
  } catch (error) {
    message.value = 'Erro ao excluir loja.'
    alertType.value = 'danger'
  }

return {
      message,
      alertType,
      handleDeleteStore,
      waitOrders
    }
  }

onMounted(() => {
  fetchStores()
})
</script>

<template>
  <div>
    <h1>Criar Nova Loja</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="store-name">Nome da Loja:</label>
        <input id="store-name" v-model="storeName" type="text" required />
      </div>
      <button type="submit" class="create-button">Criar</button>
    </form>
    <div v-if="message" :class="'alert alert-${alertType}'">
      {{ message }}
    </div>

    <h2>Suas Lojas</h2>
    <ul>
      <li v-for="store in userStores" :key="store.id">
        {{ store.name }}
        <div v-if="store.image_url">  
          <img :src="store.image_url">
        </div>
        <div v-else>
          <img src= "../assets/dummy.jpg">
        </div>
        <br />
        <nav>
          <RouterLink :to="{ name: 'products', params: { storeId: store.id } }">
          Produtos </RouterLink 
          >          
        </nav>
        <button @click="editStore(store.id)">Editar</button>
        <button @click="handleDeleteStore(store.id)">Excluir</button>
           <br>
           <nav>
          <RouterLink :to="{ name: 'pedidos', params: { storeId: store.id } }">Pedidos</RouterLink>
        </nav>
      </li>
    </ul>
  </div>
 
</template>
<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}
img {
  width: 80px;
  height: 80px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.create-button {
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.alert {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
