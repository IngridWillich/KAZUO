import EditStoreForm from '@/components/EditStoreForm/EditStoreForm'
import React from 'react'

const page = ({ params }: { params: { storeId: string } }) => {
  return (
    <div>
      <EditStoreForm storeId={params.storeId}/>
    </div>
  )
}

export default page



