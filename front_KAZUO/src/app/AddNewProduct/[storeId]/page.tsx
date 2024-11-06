import ProductForm from '@/components/ProductForm/ProductForm'
import React from 'react'

const AddNewProduct = ({ params }: { params: { storeId: string } }) => {
  return (
    <div>
    <ProductForm storeId={params.storeId}/>
    </div>
  )
}

export default AddNewProduct
