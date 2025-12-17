import React, { useCallback, useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import { useSelector } from "react-redux";
import SERVER_URL from "../../server/serverURL";
import debounce from "lodash.debounce";
import axios from "axios";
import { updateProfileApi } from "../../server/allApi";
import { toast } from "react-toastify";

const UserProfile = () => {
  
  const storeUser = useSelector((store) => store.user);

  const [preview,setPreview]=useState('')

  const [formData, setFormData] = useState({
    name: "",
    location: {
      address: "",
      latitude: '',
      longitude: "",
    },
    phone: "",
    profileImg: "",
  });
  
  const [query,setQuery]=useState('')

  const [suggestions,setSuggetions]=useState([])



  const searchLocation=async(value)=>{
    try {

      if(value.length>2){
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5&countrycodes=IN`
        );

        setSuggetions(res.data)

        
      }else{
        setSuggetions([])
      }
      
    } catch (err) {
      console.log(err)
      
    }
  }

  const debouncedSearch=useCallback(debounce(searchLocation,1000),[])
  const handleLocation=(e)=>{
    try {

      setQuery(e.target.value)
      
      debouncedSearch(e.target.value)
      setFormData({ ...formData, location: { address: "" } });

      
    } catch (err) {
      console.log(err)
      
    }
  }

  const handleSelection=(place)=>{
    setFormData({...formData,location:{
      address:place.display_name,
      latitude: place.lat,
      longitude: place.lon,
    }})
    setSuggetions([])
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const reqBody=new FormData()

      reqBody.append('name',formData.name)
      reqBody.append('address',formData.location?.address)
      reqBody.append('latitude',formData.location?.latitude)
      reqBody.append('longitude',formData.location?.longitude)
      reqBody.append('phone',formData.phone)

      if(preview){
        reqBody.append('profileImg',preview)
      }



      const res=await updateProfileApi(reqBody)
      if(res.status==200){
        toast.success('successfully updated')
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (storeUser?.user) {
      setFormData({
        name: storeUser.user.name || "",
        location: {
          address: storeUser.user.address || "",
          latitude: storeUser.user.location?.coordinates?.[0] || "",
          longitude: storeUser.user.location?.coordinates?.[1] || "",
        },
        phone: storeUser.user.phone || "",
        profileImg: storeUser.user.profileImg || "",
      });
    }
  }, [storeUser]);



  return (
    <div className="bg-gray-200 pt-20   w-full min-h-[100vh]">
      <UserHeader />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Editable Form */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form className="space-y-4">
           <div className=" flex flex-col items-center">
           
           <img
              src={preview?URL.createObjectURL(preview):`${SERVER_URL}/uploads/${formData.profileImg}`}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover mb-4 shadow cursor-pointer"
            />
            <label >
            <input type="file" hidden onChange={(e)=>setPreview(e.target.files[0])}/>
            <h1 className="text-blue-600 cursor-pointer">Add New Profile</h1>
            </label>

          
           </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring"
                  placeholder="Enter your name"
                  onChange={(e)=>setFormData({...formData,name:e.target.value})}
                  value={formData.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring"
                  placeholder="City / Area"
                  value={formData.location?.address?formData.location?.address:query}
                  onChange={(e)=>{handleLocation(e)}}
                  
                />
                 {suggestions.length > 0 && (
                    <div className="my-2   absolute z-10 bg-gray-100 w-100 shadow-lg ">
                      {suggestions.map((place) => (
                        <div
                          key={place.osm_id}
                          className=" line-clamp-1 cursor-pointer border-1 border-gray-200 px-2 py-1"
                          onClick={() => handleSelection(place)}
                        >
                          {place.display_name}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile
                </label>
                <input
                  type="Number"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring"
                  placeholder="Number"
                  onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                  value={formData.phone}

                />
              </div>

             

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                onClick={(e)=>handleSubmit(e)}
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Right: Profile Display */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <img
              src={preview?URL.createObjectURL(preview):`${SERVER_URL}/uploads/${formData.profileImg}`}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover mb-4 shadow"
            />
            <h2 className="text-xl font-semibold">{formData.name}</h2>
            <p className="text-gray-500">{formData.location.address}</p>

            <div className="mt-4 w-full text-left">
              <h3 className="font-semibold text-lg mb-2">Details</h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {formData.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>
                  {storeUser?.user?.emailId}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {formData.location.address}
                </p>
                <p>
                  <span className="font-medium">Mobile:</span>{" "}
                  {formData.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
