import Products from '@/components/Products/Products'
<<<<<<< HEAD
import ProtectedRoutesProducts from '@/context/ProtectedRoutesProducts'
=======
import ProtectedRoutes from '@/context/ProtectedRoutes'
>>>>>>> 6c55dbb037ded11f19953abc1e896a182a9487db
import React from 'react'

const page = () => {
  return (
    <div>
<<<<<<< HEAD
      <ProtectedRoutesProducts>
        <Products />
      </ProtectedRoutesProducts>
=======
    <ProtectedRoutes>
      <Products/>
      </ProtectedRoutes>
>>>>>>> 6c55dbb037ded11f19953abc1e896a182a9487db
    </div>
  )
}

export default page
