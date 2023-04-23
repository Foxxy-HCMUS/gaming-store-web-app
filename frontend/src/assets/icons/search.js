import React from 'react'

export default function searchIcon({
  size = 20, // or any default size of your choice
  color = "black" // or any color of your choice
}) {
  return (
    <svg      
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={size} 
      height={size} 
    >
      <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  )
}