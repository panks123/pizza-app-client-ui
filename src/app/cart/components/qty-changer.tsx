import { Minus, Plus } from 'lucide-react';
import React from 'react'

const QtyChanger: React.FC<{children: React.ReactNode; handleQtyChange: (changer: -1 | 1) => void}> = ({children, handleQtyChange}) => {
  return (
    <div className='flex items-center bg-gray-100 rounded-full'>
      <button 
        className={`w-10 h-10 rounded-full ${children && (Number(children) <= 1 ? "cursor-not-allowed" : "hover:bg-gray-200")} flex items-center justify-center`}
        onClick={()=> handleQtyChange(-1)}
        disabled={children ? (Number(children) <= 1) : false}
      >
          <Minus size={16} />
      </button>
      <div className='w-8 text-center'>
        {children}
      </div>
      <button 
        className='w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center' 
        onClick={()=> handleQtyChange(1)}>
          <Plus size={16} />
      </button>
    </div>
  )
}

export default QtyChanger;
