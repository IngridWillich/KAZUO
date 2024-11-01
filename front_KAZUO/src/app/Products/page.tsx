import Products from '@/components/Products/Products'
import ProtectedRoutesProducts from '@/context/ProtectedRoutesProducts'
<<<<<<< HEAD
import ProtectedRoutes from '@/context/ProtectedRoutes'
import React from 'react'

const page = ({ params }: { params: { storeId: string } }) => {
  return (
    <div>
      <ProtectedRoutesProducts>
        <Products storeId={params.storeId}/>
      </ProtectedRoutesProducts>
=======
import React from 'react'

const page = ({params}:{params:{storeId:string}}) => {
  return (
    <div>

      <ProtectedRoutesProducts>
        <Products storeId={params.storeId}/>
      </ProtectedRoutesProducts>

      

>>>>>>> 3fa6469b2ab52ed8678b5bfe1a4ae2c188786089
    </div>
  )
}

export default page