import React from 'react'

export default function HomeLine({
  size = 54, // or any default size of your choice
  color = "black" // or any color of your choice
}) {
  return (
    <svg      
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 810 809"
      width={size} 
      height={size} 
      // fill={color} 
      className="d-block my-1"
    >
      <title>Bootstrap</title>
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M 210 123 L 599.925781 123 L 599.925781 512.867188 L 210 512.867188 Z M 210 123 "/>
    </svg>
  )
}