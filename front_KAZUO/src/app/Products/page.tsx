import Products from '@/components/Products/Products'
import ProtectedRoutesProducts from '@/context/ProtectedRoutesProducts'
import React from 'react'

const page = () => {
  return (
    <div>
      <ProtectedRoutesProducts>
        <Products />
      </ProtectedRoutesProducts>
    </div>
  )
}

export default page
