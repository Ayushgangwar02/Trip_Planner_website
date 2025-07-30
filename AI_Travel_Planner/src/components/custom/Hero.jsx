import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex  flex-col items-center mx-56 gap-9'>
        <h1
        className='font-extrabold text-[40px] text-center mt-10'
        ><span className='text-[#f56551]'>Discover Your Next Adventure with Al:</span> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        <Link to = {'/create-trip'} className="z-10 relative">
            <Button>Get Started, It's Free</Button>
        </Link>

        <img src="/homePage.png" className='-mt-20 relative z-0'/>
          
    </div>

  )
}

export default Hero