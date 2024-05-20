import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import WelcomeView from '../views/Welcome.vue'
import Registration from '../components/Registration.vue'
import Stores from '../components/Stores.vue'
import EditStore from '../components/EditStore.vue'

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
      path: '/edit/:id',
      name: 'editStore',
      component: EditStore,
      props: true,
    }
  ]
 })
export default router

