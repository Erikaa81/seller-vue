<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { products } from '../products'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ProductManager',
  setup() {
    const productTitle = ref('')
    const productPrice = ref<number | null>(null)
    const storeId = ref<number | null>(null)
    const productsList = ref()
    const errorMessage = ref('')
    const successMessage = ref('')
    const route = useRoute()
    const storeIdFromRoute = route.params.storeId

    const loadProducts = async () => {
      productsList.value = await products.getProducts(storeIdFromRoute)
    }

    const handleCreateProduct = async () => {
      if (productTitle.value && productPrice.value !== null && storeId.value !== null) {
        try {
          await products.createProduct(productTitle.value, productPrice.value, storeId.value)
          productTitle.value = ''
          productPrice.value = null
          storeId.value = null
          successMessage.value = 'Product created successfully!'
          setTimeout(() => {
            successMessage.value = ''
          }, 5000)
        } catch (error) {
          console.error('Error creating product:', error)
          errorMessage.value = 'Error creating product.'
        }
      }
    }

    const handleUpdateProduct = async (product: any) => {
      try {
        await products.editProduct(product.id, product.title, product.price, product.store_id)
        await loadProducts()
      } catch (error) {
        console.error('Error updating product:', error)
        errorMessage.value = 'Error updating product.'
      }
    }

    const handleDeleteProduct = async (storeId: any, productId: number) => {
      try {
        await products.deleteProduct(storeId, productId)
        await loadProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
        errorMessage.value = 'Error deleting product.'
      }
    }

    onMounted(loadProducts)

    return {
      productTitle,
      productPrice,
      storeId,
      products: productsList,
      errorMessage,
      successMessage,
      handleCreateProduct,
      handleUpdateProduct,
      handleDeleteProduct
    }
  }
})
</script>

<template>
  <div>
    <h2>Adicionar Produto</h2>
    <form @submit.prevent="handleCreateProduct">
      <div class="form-group">
        <label for="productTitle">Nome:</label>
        <input id="productTitle" v-model="productTitle" type="text" required />
      </div>
      <div class="form-group">
        <label for="productPrice">Preço:</label>
        <input id="productPrice" v-model.number="productPrice" type="number" required />
      </div>
      <div class="form-group">
        <label for="storeId">ID da loja:</label>
        <input id="storeId" v-model.number="storeId" type="number" required />
      </div>
      <button type="submit" class="submit-button">Criar</button>
    </form>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
  text-align: right;
}
.submit-button {
  display: inline-block;
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: right;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
}

.error-message {
  color: red;
  background-color: #ffe6e6;
  border: 1px solid red;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>
