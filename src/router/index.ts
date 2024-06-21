import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import WelcomeView from '../views/Welcome.vue'
import Registration from '../components/Registration.vue'
import Stores from '../components/Stores.vue'
import EditStore from '../components/EditStore.vue'
import Products from '../components/Products.vue'
import AddProducts from '../components/AddProducts.vue'
import EditProduct from '../components/EditProduct.vue'
import DetalhesPedidos from '../components/OrderDetails.vue'
import ParentComponent from '../components/ParentComponent.vue'
import OrderDetails from '../components/OrderDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/new',
      name: 'new',
      component: Registration
    },
    {
      path: '/stores',
      name: 'stores',
      component: Stores
    },
    {
      path: '/stores/:id',
      name: 'editStore',
      component: EditStore,
      props: true
    },
    {
      path: '/stores/products',
      name: 'storeProducts',
      component: AddProducts,
      props: true
    },
    {
      path: '/products/store/:storeId',
      name: 'products',
      component: Products,
      props: true
    },
    {
      path: '/stores/:storeId/product/:productId',
      name: 'editProduct',
      component: EditProduct,
      props: true
    },
    {
      path: '/products/:productId/image',
      name: 'editProductImage',
      component: EditProduct,
      props: true
    },
    {
      path: '/products/:productId',
      name: 'product-delete',
      component: Products,
      props: true
    },
    {
      path: '/stores/:storeId/orders/new',
      name: 'pedidos',
      component: DetalhesPedidos,
      props: true,

    },
    {
      path: '/stores/:storeId/orders/new',
      name: 'pedidos',
      component: ParentComponent,
      props: true

    },
    {
      path: '/orders/:orderId/approve',
      name: 'aprovados',
      component: OrderDetails,
      props: true
    }
    
  ]
})
export default router
