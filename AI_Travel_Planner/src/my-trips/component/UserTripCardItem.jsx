import React from 'react'
import { useState, useEffect } from 'react';
import { GetPexelsPhoto } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
    const [photoUrl, setPhotoUrl] = useState(null);
      const destination = trip?.userSelection?.destination;
    
      useEffect(() => {
      if (destination) {
        GetPexelsPhoto(destination, "city").then(url => {
          if (!url || url.includes("baby") || url.includes("portrait")) {
            setPhotoUrl("/air.jpg");
          } else {
            setPhotoUrl(url);
          }
        });
      }
    }, [destination]);

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={photoUrl}  className='h-[180px] w-full object-cover rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.destination}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.budget} Budget</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.traveler} Traveler</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem