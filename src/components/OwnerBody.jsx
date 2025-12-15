import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { ShimmerContentBlock } from "react-shimmer-effects";
import { getMeApi } from '../server/allApi';

const OwnerBody = () => {
    const [isChecking,setIsChecking]=useState(true)
    const navigate = useNavigate();
    const user = localStorage.getItem("user")
    const role =localStorage.getItem("role")

    const fetchuser=async()=>{
      try {
        const res=await getMeApi()
        if(res.status==200){
          localStorage.setItem('user',res.data?.name)
          localStorage.setItem('role',res.data?.role)
        }
        
      } catch (err) {
        console.log(err)
        
      }
    }

    

    useEffect(()=>{
      if(role && role=="owner"){
        fetchuser()
        setIsChecking(false)

      }else{
        navigate('/')
      }
    },[role,navigate])
    if (isChecking) {
      return (
        <div>
          <ShimmerContentBlock
            title
            text
            cta
            thumbnailWidth={370}
            thumbnailHeight={370}
          />
        </div>
      );
    }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default OwnerBody