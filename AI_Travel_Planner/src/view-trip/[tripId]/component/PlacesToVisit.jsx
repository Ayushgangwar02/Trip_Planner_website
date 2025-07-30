import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg mt-5'>Places to Visit</h2>
        <div>
            {trip?.tripData?.itinerary?.map((day, index) => (
                <div key={index} className='mt-5'>
                    <h2 className='font-bold text-md'>Day {day.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {day.plan?.map((place, placeIndex) => (
                        <div key={placeIndex} className=''>
                           <h2 className='font-medium text-sm text-orange-600 mt-4 mb-3'>🕙 {place.timeToTravel}</h2>
                            <PlaceCardItem place={place}/>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit