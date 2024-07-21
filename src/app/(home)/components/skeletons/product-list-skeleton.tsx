import React from 'react'
import { SkeletonCard } from './skeleton-card'

const ProductListSkeleton = () => {
  return (
    <div className="container">
        <div className="grid grid-cols-4 gap-4 mt-4">
        {
            Array(8).map((_, index) => (
                <SkeletonCard key={index}/>
            ))
        }
        </div>
    </div>
  )
}

export default ProductListSkeleton
