import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/service/firebase.config'
import { toast } from 'sonner'
import InfoSection from './component/infoSection'
import Hotels from './component/Hotels'
import PlacesToVisit from './component/PlacesToVisit'
import Footer from './component/Footer'

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