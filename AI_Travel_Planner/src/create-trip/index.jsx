import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions, SelectTravelesList } from '@/constants/options'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { chatSession, AI_PROMPT } from '@/service/AIModel'
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebase.config'

function CreateTrip() {
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      getUserProfile(codeResp);
    },
    onError: (error) => console.log(error)
  });

  

  const getUserProfile = (tokenInfo) => {
    fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    })
    .then((resp) => resp.json())
    .then((user) => {
      console.log('User Profile:', user);
      localStorage.setItem('user', JSON.stringify(user));
      setOpenDialog(false);
      onGenerateTrip();
    })
    .catch((error) => {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to get user profile');
    });
  };



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
    handleInputChange('destination', place.formatted);
    setShowDropdown(false);
    setSuggestions([]);
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if(!user){
      setOpenDialog(true);
      return;
    }

    if (!formData?.destination || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details");
      return;
    }

    const SaveAiTrip=async(TripData)=>{
      setLoading(true);
      const user =JSON.parse (localStorage.getItem('user'));
      const docId=Date.now().toString();
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection:formData,
        tripData:JSON.parse(TripData),
        userEmail:user?.email,
        id:docId
      });
      setLoading(false);
    };

    setIsGenerating(true);
    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace('{destination}', formData?.destination)
        .replace('{noOfDays}', formData?.noOfDays)
        .replace('{budget}', formData?.budget)
        .replace('{traveler}', formData?.traveler);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      setLoading(false);
      toast.success("Trip generated successfully!");
      await SaveAiTrip(result?.response?.text());

    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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

        <div className='mb-10'>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            className="w-full h-10"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div className='mb-10'>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-2 border cursor-pointer rounded-lg hover:shadow transition-all
                  ${formData?.budget === item.title ? 'shadow-lg border-black' : ''}
                `}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-10'>
          <h2 className='text-xl my-3 font-medium'>Who are you traveling with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-2 border cursor-pointer rounded-lg hover:shadow transition-all
                  ${formData?.traveler === item.people ? 'shadow-lg border-black' : ''}
                `}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>

        <Button
          disabled={Loading || isGenerating}
          onClick={onGenerateTrip}>
          {isGenerating ? 'Generating...' : ''}
          {Loading?
          <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: 'Generate trip'}
              
        </Button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <img src='/logo.svg' alt='logo' className="h-8 w-8" />
          Sign in With Google
        </DialogTitle>

        <DialogDescription>
          Sign in to the app with Google authentication securely
        </DialogDescription>

        <div className="mt-5">
          <Button
            onClick={login}
            className="w-full flex gap-4 items-center">
              
              
            <FcGoogle className='h-7 w-7' />
            Sign In With Google
            
          </Button>
        </div>
      </DialogHeader>


        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
