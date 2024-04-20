<script setup lang="ts">
import { Auth } from '../auth'
import { ref, watch, type Ref } from 'vue'
const auth = new Auth()
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const signOut = function () {
  auth.signOut(() => (isLoggedIn.value = auth.isLoggedIn()))
}
</script>
<template>
  <main>
    <template v-if="isLoggedIn">
      <h4>{{ 'Successful login!' }}</h4>

      <h3>Welcome to Delivery, {{ currentUser && currentUser.email }}!</h3>
      <br />
      <nav>
        <a @click="signOut">Sign Out</a>
      </nav>
    </template>
    <template v-else>
      <h3>Please log in to have access</h3>
      <br />
      <nav>
        <RouterLink :to="{ name: 'signin' }"> Sign In </RouterLink>
      </nav>
    </template>
  </main>
</template>
