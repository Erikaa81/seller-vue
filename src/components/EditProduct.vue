<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { products } from '../products'; 

export default defineComponent({
  name: 'EditProduct',
  setup() {
    const route = useRoute();

    const productId = ref<string>(route.params.productId as string);
    const storeId = ref<string>(route.params.storeId as string);
    const titleProduct = ref<string>('');
    const priceProduct = ref<number>(0);
    const selectedFile = ref<File | null>(null);
    const message = ref<string>('');
    const alertType = ref<string>('');
    const imageUrl = ref<string>('');

    const fetchProduct = async () => {
      try {
        const productList = await products.getProducts(storeId.value);
        const product = productList.find(product => product.id === parseInt(productId.value));

        if (product) {
          titleProduct.value = product.title;
          priceProduct.value = product.price;
          imageUrl.value = product.image_url;

        } else {
          console.log('Produto não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar dados dos produtos:', error);
      }
    };

    const updateProduct = async () => {
      try {
        await products.editProduct(
          productId.value,
          titleProduct.value,
          priceProduct.value,
          storeId.value,

        );

        if (selectedFile.value) {
          await products.uploadImageProduct(selectedFile.value, parseInt(productId.value));
        }

        message.value = 'Produto atualizado com sucesso!';
        alertType.value = 'success';
      } catch (error) {
        message.value = 'Erro ao atualizar o produto.';
        alertType.value = 'danger';
      }
    };

    const onFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
      }
    };

    onMounted(fetchProduct);

    return {
      titleProduct,
      priceProduct,
      storeId,
      message,
      alertType,
      updateProduct,
      onFileChange,
      imageUrl

    };
  }
});

</script>
<template>
  <div class="edit-product">
    <h2>Editar Produto</h2>
    <form @submit.prevent="updateProduct">
      <div>
        <label for="title">Nome:</label>
        <input type="text" v-model="titleProduct" id="title" required />
      </div>
      <div>
        <label for="price">Preço:</label>
        <input type="number" v-model.number="priceProduct" id="price" required />
      </div>
      <div>
        <label for="storeId">Id da loja:</label>
        <input type="number" v-model.number="storeId" id="storeId" required />
      </div>
      <div>
        <label for="image">Imagem do Produto:</label>
        <input type="file" @change="onFileChange" id="image" />
      </div>
      <button type="submit">Atualizar Produto</button>
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