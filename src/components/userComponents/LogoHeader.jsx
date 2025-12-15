import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const LogoHeader = () => {
  const storeUser=useSelector((store)=>store.user)
  return (
    <div>
    <div className="navbar sm:hidden  bg-white px-10 fixed top-0 min-h-20 z-100">
<div className="flex justify-between w-full ">
<Link className=" text-lg w-2/3  font-bold cursor-pointer  text-green-700 font-['Lato','sans-serif']">Welcome<span> {storeUser.user?.name}</span></Link>

</div>



</div>
</div>
  )
}

export default LogoHeader