import { Auth } from './auth'
import router from '@/router'
import type { Order } from './types';


interface StoreResponse {
  store: { name: string}
}
async function getStores(): Promise<{ stores: StoreResponse[]; message?: string }> {
  const auth = new Auth()
  const currentUser = auth.currentUser()
  const token = currentUser?.token

  try {
    const response = await fetch('http://127.0.0.1:3000/stores', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { stores: [], message: errorData.message || 'Failed to fetch stores' }
    }

    const stores = await response.json()
    return { stores }
  } catch (error) {
    return { stores: [], message: 'An error occurred' }
  }
}

interface StoreResponse {
  store: { name: string }
}

async function newStore(name_store: string): Promise<{ success: boolean; message?: string }> {
  const auth = new Auth()
  const currentUser = auth.currentUser()
  const token = currentUser?.token

  const body: StoreResponse = {
    store: {
      name: name_store
    }
  }

  try {
    const response = await fetch('http://127.0.0.1:3000/stores', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + currentUser?.token
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { success: false, message: errorData.message || 'Failed to create store' }
    }

    const data_store = await response.json()
    if (data_store) {
      router.push('/stores')
      return { success: true, message: 'Store created successfully!' }
    } else {
      return { success: false, message: 'Failed to create store' }
    }
  } catch (error) {
    return { success: false, message: 'Error occurred' }
  }
}

async function editStore(
  name_store: any,
  store_id: any
): Promise<{ success: boolean; message?: string }> {
  const auth = new Auth()
  const currentUser = auth.currentUser()
  const token = currentUser?.token

  const body = {
    store: {
      name: name_store
    }
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/stores/${store_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + currentUser?.token
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { success: false, message: errorData.message || 'Failed to edit store' }
    }

    const data_store = await response.json()
    return { success: true, message: 'Store edited successfully!' }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}
async function getStore(
  store_id: any,
  store_name: any
): Promise<{
  store?: any
  message?: string
}> {
  const auth = new Auth()
  const currentUser = auth.currentUser()
  const token = currentUser?.token

  try {
    const response = await fetch(`http://127.0.0.1:3000/stores/${store_id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + currentUser?.token
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { message: errorData.message || 'Failed to fetch store' }
    }

    const data_store = await response.json()
    return { store: data_store }
  } catch (error) {
    return { message: 'An error occurred' }
  }
}

async function deleteStore(store_id: any) {
  const auth = new Auth()
  const currentUser = auth.currentUser()
  const response = await fetch(`http://127.0.0.1:3000/stores/${store_id}`,{
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + ' ' + currentUser?.token
    }
  })

  if (response.ok) {
    return { success: true }
  } else {
    const errorData = await response.json()
    return { success: false, message: errorData.message || 'Failed to delete store' }
  }
}

async function uploadImageStore(image: File, store_id: number) {
  const auth = new Auth()
  const currentUser = auth.currentUser()
  const formData = new FormData()
  formData.append('store[image]', image)
  const response = await fetch(`http://127.0.0.1:3000/stores/${store_id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + currentUser?.token
    },
    body: formData
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to upload image')
  }
}

export async function fetchOrderDetails(storeId: number): Promise<Order> {
  try {
    const response = await fetch(`/stores/${storeId}/orders/new`); // Utiliza o parâmetro storeId dinâmico
    console.log(response); 
    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do pedido.');
    }
    return response.json() as Promise<Order>;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}
export const stores = {
  getStore,
  getStores,
  newStore,
  editStore,
  deleteStore,
  uploadImageStore
}
