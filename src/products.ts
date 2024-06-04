import { Auth } from './auth'
import router from '@/router'

interface Product {
    id: number
    title: string
    price: number
    store_id: number
    image_url: string
  }

function getToken(): string {
  const auth = new Auth()
  const currentUser = auth.currentUser()
  return currentUser?.token || ''
}

async function getProducts(store_id: any): Promise<Product[]> {
  const token = getToken()
  console.log(store_id)
  try {
    const response = await fetch(`http://127.0.0.1:3000/products/store/${store_id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to fetch products')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
export async function createProduct(
  productTitle: string,
  productPrice: number,
  storeId: number
): Promise<Product> {
  const token = getToken()
  const body = {
    product: {
      title: productTitle,
      price: productPrice,
      store_id: storeId
    }
  }

  const response = await fetch('http://127.0.0.1:3000/products', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create product')
  }

  return response.json()
}

export async function editProduct(
  productId: any,
  productTitle: string,
  productPrice: number,
  storeId: any
): Promise<Product> {
  const token = getToken()
  const body = {
    product: {
      title: productTitle,
      price: productPrice
    }
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/products/${productId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to update product')
    }

    return response.json()
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

async function deleteProduct(store_id: number, product_id: number) {
  const token = getToken()
  try {
    const response = await fetch(`http://127.0.0.1:3000/products/${product_id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to delete product')
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}
async function uploadImageProduct(image: File, product_id: number) {
  const token = getToken()
  const formData = new FormData()
  formData.append('product[image]', image)
  const response = await fetch(`http://127.0.0.1:3000/products/${product_id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: formData
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to upload image')
  }
}


export const products = {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
  uploadImageProduct
}
