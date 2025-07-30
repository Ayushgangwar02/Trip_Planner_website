import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/service/firebase.config'
import { toast } from 'sonner'
// Import components for trip view
import InfoSection from './component/InfoSection.jsx'
import Hotels from './component/Hotels.jsx'
import PlacesToVisit from './component/PlacesToVisit.jsx'
import Footer from './component/Footer.jsx'

function ViewTrip() {
    const {tripId}=useParams();
    const [tripData,setTripData]=useState({});
    useEffect(()=>{
        tripId && GetTripData();
    },[tripId]);
    const GetTripData=async()=>{
        const docRef=doc(db,'AiTrips',tripId);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            console.log("document:",docSnap.data());
            setTripData(docSnap.data());
        }
        else{
            console.log("no such document");
            toast('no trip found!')
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* {information section} */}
        <InfoSection trip = {tripData}/>
        {/* {recommendation hotels} */}
        <Hotels trip={tripData}/>

        {/* {daily plan}*/}
        <PlacesToVisit trip={tripData}/>
        {/* footer */}
        <Footer trip = {tripData}/>
    </div>
  )
}

export default ViewTrip