'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

type Product = {
  id: number
  name: string
  price: number
}

export default function Category() {
  const [count, setCount] = useState(0)

  // 2️⃣ Ensure fetchProducts returns Product[]
  const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('http://localhost:3002/products/')
    return response.data
  }

  // 3️⃣ Pass generic type <Product[]>
  const { data, error, isLoading, refetch } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    refetchInterval:1000,
    refetchIntervalInBackground: true,
    enabled: false,
  })

  if (error) {
    return <p>Error in fetching data.</p>
  }

  if (isLoading) {
    return <p>Please wait while Loading...</p>
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Category</h1>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          {data?.map((item) => (
            <div key={item.id} className="flex flex-col p-5 border-2 rounded-2xl gap-2">
              <h5>{item.name}</h5>
              <p>{item.price}</p>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setCount(count - 1)}>-</button>
                {count}
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <button>ADD TO CART</button>
                <button>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => refetch()} >Reload</button>
      </main>
    </div>
  )
}
