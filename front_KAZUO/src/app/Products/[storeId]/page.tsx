import Products from '@/components/Products/Products'
import React from 'react'

const StorePage = ({ params }: { params: { storeId: string } }) => {
  return (
    <div>
    <Products storeId={params.storeId}/>
    </div>
  )
}

export default StorePage
