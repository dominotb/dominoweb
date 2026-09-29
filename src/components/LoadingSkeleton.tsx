import React from 'react'

export default function LoadingSkeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-700/80 rounded-md ${className}`} />
}
