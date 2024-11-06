import Statistics from '@/components/Statistics/Statistics'
import React from 'react'

const StatisticsPage = ({ params }: { params: { storeId: string } }) => {
  return (
    <div>
    <Statistics storeId={params.storeId}/>
    </div>
  )
}

export default StatisticsPage