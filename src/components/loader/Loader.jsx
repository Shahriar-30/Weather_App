import React from 'react'

function Loader() {
  return (
    <>
    <div className='bg-blue-500 w-full h-screen flex flex-col items-center justify-center'>
        <img src="logo.svg" className='w-full max-w-[120px]' />
        <h1 className='text-white font-semibold font-pop text-[30px]'>Weather App</h1>
    </div>
    </>
  )
}

export default Loader