import Products from '@/components/Products/Products'
import ProtectedRoutes from '@/context/ProtectedRoutes'
import React from 'react'

const page = () => {
  return (
    <div>
    <ProtectedRoutes>
      <Products/>
      </ProtectedRoutes>
    </div>
  )
}

export default page