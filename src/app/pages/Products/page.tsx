'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

type Product = {
  id: number
  name: string
  price: number
  image: string
  count?: number
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [count, setCount] = useState(0)

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:3002/products')
      setProducts(response.data)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (isError) toast.error('Error fetching products')
  }, [isError])

  useEffect(() => {
    if (isLoading) {
      const id = toast.loading('Loading products...')
      return () => toast.dismiss(id)
    }
  }, [isLoading])

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] 
      items-center justify-items-center min-h-screen p-8">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Products</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex items-center justify-center flex-wrap gap-5">
            {products.map((item) => (
              <div key={item.id} className="flex flex-col p-5 border-2 rounded-2xl gap-2">
                <h5>{item.name}</h5>
                <p>{item.price}</p>
                <div className="flex items-center justify-between gap-2">
                  <button onClick={() => setCount(count - 1)}>-</button>
                  <p>{count}</p>
                  <button onClick={() => setCount(count + 1)}>+</button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button>Add Cart</button>
                  <button>Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
