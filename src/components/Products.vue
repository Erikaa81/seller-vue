<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { products } from '../products'
import { useRoute, useRouter } from 'vue-router'

const productTitle = ref('')
const productPrice = ref<number | null>(null)
const storeId = ref<number | null>(null)
const route = useRoute()
const router = useRouter()
const storeIdFromRoute = route.params.storeId

const productsList = ref<any[]>([])
const errorMessage = ref('')
const successMessage = ref('')

const loadProducts = async () => {
  console.log("loadProducts")
  try {
    productsList.value = await products.getProducts(storeIdFromRoute)
  } catch (error) {
    errorMessage.value = 'Erro ao carregar produtos.'
    console.error("Erro ao carregar produtos:", error)
  }
}

const redirectToUpdateProduct = (product: any) => {
  router.push({
    name: 'editProduct',
    params: { productId: product.id, storeId: product.store_id }
  })
}

const handleRemoveProductFromList = (productId: number) => {
  productsList.value = productsList.value.filter(product => product.id !== productId)
  successMessage.value = 'Produto removido da lista com sucesso.'
}

const handleDeleteProduct = async (storeId: number, productId: number) => {
  try {
    await products.deleteProduct(storeId, productId)
    await loadProducts()
    successMessage.value = 'Produto excluído com sucesso.'
  } catch (error) {
    errorMessage.value = 'Erro ao excluir produto.'
  }
}

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <div>
    <h1>Produtos</h1>
    <ul>
      <li v-for="product in productsList" class="form-group" :key="product.id">
        {{ product.title }} - {{ product.price }} 
        <div v-if="product.image_url">  
          <img :src="product.image_url">
        </div>
        <div v-else>
          <img src= "../assets/dummy.jpg">
        </div>
        <button @click="redirectToUpdateProduct(product)">Editar</button>
        <button @click="handleRemoveProductFromList(product.id)">Remover da Lista</button>
        <button @click="handleDeleteProduct(product.store_id, product.id)">Excluir</button>
      </li>
    </ul>
    <nav>
      <router-link :to="{ name: 'storeProducts', params: { storeId: storeIdFromRoute } }">
        <button class="edit-button">Adicionar</button>
      </router-link>
    </nav>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
  text-align: right;
}

img {
  width: 30px;
  height: 30px;
}
.submit-button {
  float: right;
}

.error-message {
  color: red;
  margin-top: 0.5rem;
}

.success-message {
  color: green;
  margin-top: 0.5rem;
}
</style>
