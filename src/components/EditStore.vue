<template>
  <div>
    <h1>Editar Loja</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="store-name">Nome da Loja:</label>
        <input id="store-name" v-model="name_store" type="text" required />
      </div>
      <button type="submit">Salvar</button>
    </form>
    <div v-if="message" :class="'alert alert-${alertType}'">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { stores } from '../stores';

const route = useRoute();
const storeId = route.params.id;
const storeName = route.params.name;

const name_store = ref('');
const message = ref('');
const alertType = ref('');

const fetchStore = async () => {
  try {
    const response = await stores.getStore(storeId, storeName );
    if (response) {
      name_store.value = response.store.name;
    } else {
      message.value = 'Falha ao obter dados da loja.';
      alertType.value = 'danger';
    }
  } catch (error) {
    message.value = 'Erro ao obter dados da loja.';
    alertType.value = 'danger';
  }
};

const handleSubmit = async () => {
  try {
    const response = await stores.editStore(name_store.value, storeId);
    if (response.success) {
      message.value = response.message || 'Loja editada com sucesso!';
      alertType.value = 'success';
    } else {
      message.value = response.message || 'Falha ao editar loja.';
      alertType.value = 'danger';
    }
  } catch (error) {
    message.value = 'Erro ao editar loja.';
    alertType.value = 'danger';
  }
};

onMounted(() => {
  fetchStore();
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

button {
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
</style>