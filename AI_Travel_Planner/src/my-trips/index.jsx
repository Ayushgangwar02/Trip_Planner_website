import React, { useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/service/firebase.config';
import UserTripCardItem from './component/UserTripCardItem.jsx';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips,setUserTrips]=useState([]);
  useEffect(()=>{
    GetUserTrips();
  },[])
  const GetUserTrips = async() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(!user){
      navigate('/');
      return;
    }
    setUserTrips([]);
    const q = query(collection(db,'AiTrips'),where('userEmail','==',user?.email));
    const querySanpshot=await getDocs(q);
    querySanpshot.forEach((doc)=>{
      console.log(doc.id, "=>",doc.data());
      setUserTrips(preVal=>[...preVal,doc.data()]);
    })

  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>MyTrips</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTrips?.length>0? userTrips.map((trip,index)=>(
          <UserTripCardItem trip = {trip}/>
        ))
        :[1,2,3,4,5,6].map((item,index)=>(
          <div key = {index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default MyTrips