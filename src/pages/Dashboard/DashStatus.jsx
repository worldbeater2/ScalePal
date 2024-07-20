import React from 'react'

const DashStatus = () => {
  return (
    <>
     <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 font-outfit">
        <p className="text-sm font-semibold md:text-2xl text-prussianblue">Status</p>

        <div className='w-full h-96 mt-28 flex flex-row items-center justify-center text-3xl font-semibold animate-pulse text-prussianblue' > Hang tight! We're polishing things up</div>

     </main>
  </>
  )
}

export default DashStatus