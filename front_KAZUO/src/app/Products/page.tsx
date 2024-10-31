import Products from '@/components/Products/Products'
import ProtectedRoutes from '@/context/ProtectedRoutes'
import React from 'react'

const page = ({ params }: { params: { storeId: string } }) => {
  return (
    <div>
    <ProtectedRoutes>
      <Products storeId= {params.storeId}/>
      </ProtectedRoutes>
    </div>
  )
}

export default page