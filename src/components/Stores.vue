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
        <button @click="editStore(store.id)" class="edit-button">Editar</button>
        <br />
      </li>
    </ul>
    <div v-if="storesMessage" class="alert alert-danger">
      {{ storesMessage }}
    </div>
    <br />
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { stores } from '../stores';
import { auth } from '@/auth';
const storeName = ref('');
const message = ref('');
const alertType = ref('');
const userStores = ref();
const storesMessage = ref('');


const router = useRouter();

const handleSubmit = async () => {
  try {
    const response = await stores.newStore(storeName.value);
    if (response.success) {
      message.value = response.message || 'Loja criada com sucesso!';
      alertType.value = 'success';
      await fetchStores();
    } else {
      message.value = response.message || 'Falha ao criar loja.';
      alertType.value = 'danger';
    }
  } catch (error) {
    message.value = 'Erro ao criar loja.';
    alertType.value = 'danger';
  }
};

const fetchStores = async () => {
  try {
    const response = await stores.getStores();
    if (response.stores && response.stores.length) {
      userStores.value = response.stores;
    } else {
      storesMessage.value = response.message || 'Falha ao obter lojas.';
    }
  } catch (error) {
    storesMessage.value = 'Erro ao obter lojas.';
  }
};

const editStore = (storeId: number) => {
  router.push({ name: 'editStore', params: { id: storeId , name: storeName.value} });
};

onMounted(() => {
  fetchStores();
});
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
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

.edit-button {
  font-size: 14px;
  cursor: pointer;
  float: right;
}
</style>