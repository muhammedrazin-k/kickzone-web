import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getMeApi } from '../server/allApi'
import { setUser } from '../utils/userSlice'

const Body=()=>{
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData=useSelector((store)=>store.user)

  const fetchUser=async()=>{
    try {
      if(userData.user) return

      const res=await getMeApi()
      if(res.status==200){
        dispatch(setUser(res.data))
        localStorage.setItem("user",(res.data.name))
        localStorage.setItem("role",res.data.role)
      }else{
        localStorage.clear()
        navigate('/')
      }
    } catch (err) {
      
      console.log(err)
      
    }
  }

  useEffect(()=>{
    
      fetchUser()
    
  },[])
  
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Body