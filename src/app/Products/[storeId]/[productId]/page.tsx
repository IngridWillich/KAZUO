import EditProductForm from '@/components/editProducts/editProductsForm'
import React from 'react'

const ProductPage = ({ params }: { params: { storeId:string, productId: string } }) => {
  return (
    <div>
    <EditProductForm productId={params.productId}/>
    </div>
  )
}

export default ProductPage