import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPexelsPhoto } from '@/service/GlobalApi';

function InfoSection({ trip }) {
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
    <div>
      {photoUrl ? (
        <img src={photoUrl} alt={destination} className='h-[340px] w-full object-cover rounded-xl' />
      ) : (
        <div className='h-[340px] w-full bg-gray-200 rounded-xl animate-pulse' />
      )}

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{destination}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-lg text-gray-500 text-xs md:text-md'> 📅
              {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-lg text-gray-500 text-xs md:text-md'> 💰
              {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-lg text-gray-500 text-xs md:text-md'> 🥂 no. of traveler:
              {trip?.userSelection?.traveler} People
            </h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
