import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from '../../components/AddNewInterview'

function Dashboard() {
  return (
    <div className='p-10'> 
      <h2 className = 'font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-500'>Start your AI interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
     
    </div>
  )
}

export default Dashboard