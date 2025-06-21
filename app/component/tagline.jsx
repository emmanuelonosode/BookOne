import React from 'react'

function Tagline({tag}) {
  return (
    <p className='text-center bg-gray-100  rounded-full px-4 py-2 tagline w-fit'>
        {tag}
    </p>
  )
}

export default Tagline