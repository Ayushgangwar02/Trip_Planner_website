
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetPexelsPhoto } from '@/service/GlobalApi';

function PlaceCardItem({ place }) {
   const [photoUrl, setPhotoUrl] = useState('/air.jpg');

   useEffect(() => {
     if (place?.placeName) {
       GetPexelsPhoto(place.placeName).then(url => {
         if (url) setPhotoUrl(url);
       });
     }
   }, [place]);

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all'>
        <img src={photoUrl} className='w-[130px] h-[100px] rounded-xl object-cover' />
        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails}</p>
          <h2 className='mt-2'> 🕖 {place.bestTimeToVisit}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;