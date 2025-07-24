import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions } from '@/constants/options'
import { SelectTravelesList } from '@/constants/options'
import { Button } from '@/components/ui/button'

function CreateTrip() {
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce function to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (destination.length > 2) {
        searchPlaces(destination);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [destination]);

  const searchPlaces = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}&limit=5&format=json`
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.results || []);
        setShowDropdown(true);
      } else {
        console.error('Geoapify API error:', response.status);
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const selectDestination = (place) => {
    setDestination(place.formatted);
    setShowDropdown(false);
    setSuggestions([]);
  };
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences</p>

      <div className='mt-20'>
        <div className='relative mb-10'>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <input
            type="text"
            value={destination}
            onChange={handleDestinationChange}
            placeholder="Search for Destination..."
            className="w-full h-10 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-gray-400"
            onFocus={() => destination.length > 2 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 300)}
          />

          {isLoading && (
            <div className="absolute right-3 top-12 text-gray-500">
              Loading...
            </div>
          )}

          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
              {suggestions.map((place, index) => (
                <div
                  key={index}
                  onClick={() => selectDestination(place)}
                  onMouseDown={(e) => e.preventDefault()}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium">{place.formatted}</div>
                  {place.country && (
                    <div className="text-sm text-gray-500">{place.country}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'} type="number" className="w-full h-10"/>
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index)=>(
              <div key = {index} className='p-1 border cursor-pointer rounded-lg hover:shadow'>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList .map((item,index)=>(
              <div key = {index} className='p-1 border cursor-pointer rounded-lg hover:shadow'>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='my-10 justify-end flex'>
        <Button>Generate Trip</Button>
      </div>
    </div>
  )
}

export default CreateTrip