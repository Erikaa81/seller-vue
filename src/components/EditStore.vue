<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { stores } from '../stores'

const route = useRoute()
const storeId = route.params.id
const selectedFile = ref<File | null>(null)
const name_store = ref('')
const message = ref('')
const alertType = ref('')
const imageUrl = ref('')


const fetchStore = async () => {
  try {
    const response = await stores.getStore(storeId, name_store)
    if (response) {
      name_store.value = response.store.name
      imageUrl.value = response.store.image_url || ''
    } else {
      message.value = 'Falha ao obter dados da loja.'
      alertType.value = 'danger'
    }
  } catch (error) {
    message.value = 'Erro ao obter dados da loja.'
    alertType.value = 'danger'
  }
}

const handleSubmit = async () => {
  try {
    const response = await stores.editStore(name_store.value, storeId)
    if (selectedFile.value) {
      await stores.uploadImageStore(selectedFile.value, parseInt(storeId as string))
    }
    message.value = response.message || 'Loja editada com sucesso!'
    alertType.value = 'success'
    await fetchStore() 
  } catch (error) {
    message.value = 'Erro ao editar loja.'
    alertType.value = 'danger'
  }
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
    imageUrl.value = URL.createObjectURL(selectedFile.value) 
  }
}

onMounted(fetchStore)


</script>
<template>
  <div>
    <h1>Editar Loja</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="store-name">Nome da Loja:</label>
        <input id="store-name" v-model="name_store" type="text" required />
      </div>
      <div>
        <label for="image">Imagem da Loja:</label>
        <input type="file" @change="onFileChange" id="image" />
      </div>
      <button type="submit">Salvar</button>
    </form>
    <div v-if="message" :class="'alert alert-' + alertType">
      {{ message }}
    </div>
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
