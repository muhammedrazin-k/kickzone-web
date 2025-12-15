import React, { useCallback, useState } from "react";
import OwnerDrawer from "./OwnerDrawer";
import debounce from "lodash.debounce";
import axios from "axios";
import { toast } from "react-toastify";
import { addTurfApi } from "../../server/allApi";

const AddTurf =() => {
  const [suggestions, setsuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [preview,setPreview]=useState('')

  const [fromData, setFormData] = useState({
    turfName: "",
    turfImage: "",
    location: {
      address: "",
      latitude: "",
      longitude: "",
    },
    contactNumber: "",
    slots: [],
    availability: {
      from: "",
      to: "",
    },
    facilities: [],
  });


  const allSlots = ["5s", "6s", "7s", "11s"];
  const allFacilities = [
    "parking",
    "flood lights",
    "drinking water",
    "washroom",
    "seating gallery",
    "first aid",
  ];
  const searchLocation = async (value) => {
    try {
      if (value.length > 2) {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5&countrycodes=IN`
        );
        setsuggestions(res.data);
      } else {
        setsuggestions([]);
      }
    } catch (error) {
      console.log(error);
      setsuggestions([]);
    }
  };

  const debouncedSearch = useCallback(debounce(searchLocation, 1000), []);

  const handleLocation = (e) => {
    setQuery(e.target.value);
    const value = e.target.value;
    debouncedSearch(value);
    setFormData({ ...fromData, location: { address: "" } });
  };

  const handleSelection = (place) => {
    setFormData({
      ...fromData,
      location: {
        address: place.display_name,
        latitude: place.lat,
        longitude: place.lon,
      },
    });
    setsuggestions([]);
  };

  const addImage=async(e)=>{
    setFormData({...fromData,turfImage:e.target.files[0]})
    setPreview(e.target.files[0])
  }

  const handleSubmit = async () => {

      const {turfName,turfImage,location,contactNumber,slots,availability,facilities}=fromData
      if(turfImage && turfName && location.latitude &&location.longitude && contactNumber&&   Array.isArray(slots) &&
      slots.length > 0 &&
      slots.every(slot => slot.type && slot.price) &&availability.from&& availability.to&& facilities){
        try {

          const reqBody=new FormData()

          reqBody.append("turfName",turfName)
          reqBody.append('turfImage',turfImage)
          reqBody.append('location',JSON.stringify(location))
          reqBody.append('contactNumber',contactNumber)
          reqBody.append('slots',JSON.stringify(slots))
          reqBody.append('availability',JSON.stringify(availability))
          reqBody.append('facilities',JSON.stringify(facilities))


          const res=await addTurfApi(reqBody)
          if(res.status===200){
            toast.success('successfully added your new turf')
            setFormData({turfName:"",
              turfImage: "",
              location: {
                address: "",
                latitude: "",
                longitude: "",
              },
              contactNumber:"",
              slots: [],
              availability: {
                from: "",
                to: "",
              },
              facilities: [],})
              setQuery('')

          }
        } catch (err) {
          
          console.log(err)
        }

      }else{
        toast.warning('fill the required feild including image')
        
      }
    
  };
  const handleCancel = async () => {
    setFormData({
      turfName: "",
      turfImage: "",
      location: {
        address: "",
        latitude: "",
        longitude: "",
      },
      contactNumber: "",
      slots: [],
      availability: {
        from: "",
        to: "",
      },
      facilities: [],})

  
  };


  const handleSlotCheck = (type) => {
    setFormData((prev) => {
      const exists = prev.slots?.find((s) => s.type === type);
      if (exists) {
        return { ...prev, slots: prev.slots.filter((s) => s.type !== type) };
      } else {
        return { ...prev, slots: [...(prev.slots||[]), { type, price: "" }] };
      }
    });
  };

  const handleSlotPriceChange = (type, price) => {
    setFormData((prev) => ({
      ...prev,
      slots: prev.slots.map((s) => (s.type === type ? { ...s, price } : s)),
    }));
  };

  const handleFacilityToggle = (facility) => {
    setFormData((prev) => {
      if (prev.facilities?.includes(facility)) {
        return {
          ...prev,
          facilities: prev.facilities?.filter((f) => f !== facility),
        };
      } else {
        return { ...prev, facilities: [...prev.facilities ||[], facility] };
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full md:flex">
    <OwnerDrawer />
  
    {/* Main Content */}
    <div className="flex-1 overflow-y-auto p-6 md:p-10 h-screen">
  
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-6 rounded-3xl shadow-lg text-white mb-8">
        <h1 className="text-2xl font-semibold">Add Your Turf</h1>
        <p className="text-gray-200 mt-1 text-sm">
          Fill out the details below to register a new turf.
        </p>
      </div>
  
      {/* Form Container */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">
  
        {/* Image + Basic Info */}
        <div className="grid lg:grid-cols-2 gap-10">
  
          {/* Image Upload */}
          <div>
            <p className="text-gray-700 font-medium mb-2">Turf Image</p>
  
            <label className="block cursor-pointer group relative">
              <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden h-64 flex items-center justify-center">
                <img
                  src={
                    preview
                      ? URL.createObjectURL(preview)
                      : "https://icons.veryicon.com/png/o/application/designe-editing/add-image-1.png"
                  }
                  alt="Preview"
                  className="w-full h-full object-cover group-hover:opacity-80 transition"
                />
              </div>
              <input type="file" className="hidden" onChange={addImage} />
            </label>
          </div>
  
          {/* Basic Fields */}
          <div className="space-y-5">
  
            {/* Turf Name */}
            <div>
              <label className="text-gray-700 font-medium">Turf Name</label>
              <input
                type="text"
                placeholder="Enter Turf Name"
                value={fromData.turfName}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...FormData, turfName: e.target.value })
                }
              />
            </div>
  
            {/* Turf Location */}
            <div>
              <label className="text-gray-700 font-medium">Turf Location</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search location"
                  value={
                    fromData.location?.address ? fromData.location.address : query
                  }
                  onChange={handleLocation}
                  className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
                />
  
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 bg-white shadow-lg rounded-xl mt-2 max-h-48 overflow-y-auto z-10">
                    {suggestions.map((place) => (
                      <div
                        key={place.osm_id}
                        onClick={() => handleSelection(place)}
                        className="px-4 py-2 border-b text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {place.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
  
            {/* Contact Number */}
            <div>
              <label className="text-gray-700 font-medium">Contact Number</label>
              <input
                type="tel"
                placeholder="Enter Contact Number"
                maxLength={10}
                value={fromData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...fromData, contactNumber: e.target.value })
                }
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
  
          </div>
        </div>
  
        {/* Slots Section */}
        <div className="mt-10">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Slots & Pricing</h3>
  
          <div className="space-y-3">
            {allSlots.map((slotType) => (
              <div key={slotType} className="flex items-center gap-4">
  
                {/* Slot Checkbox */}
                <input
                  type="checkbox"
                  className="w-5 h-5 text-emerald-600"
                  checked={fromData.slots?.some((s) => s.type === slotType)}
                  onChange={() => handleSlotCheck(slotType)}
                />
  
                {/* Slot Name */}
                <span className="w-20 font-medium">{slotType}</span>
  
                {/* Price Input */}
                {fromData.slots?.some((s) => s.type === slotType) && (
                  <input
                    type="number"
                    placeholder="Price"
                    value={
                      fromData.slots.find((s) => s.type === slotType)?.price || ""
                    }
                    onChange={(e) =>
                      handleSlotPriceChange(slotType, e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 w-32 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Availability Section */}
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-gray-700 font-medium">Available From</label>
            <input
              type="time"
              value={fromData.availability?.from || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: { ...prev.availability, from: e.target.value },
                }))
              }
              className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
  
          <div>
            <label className="text-gray-700 font-medium">Available To</label>
            <input
              type="time"
              value={fromData.availability?.to || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: { ...prev.availability, to: e.target.value },
                }))
              }
              className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
  
        {/* Facilities */}
        <div className="mt-10">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Facilities</h3>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allFacilities.map((facility) => (
              <label key={facility} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={fromData.facilities?.includes(facility)}
                  onChange={() => handleFacilityToggle(facility)}
                  className="w-5 h-5 text-emerald-600"
                />
                <span>{facility}</span>
              </label>
            ))}
          </div>
        </div>
  
        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleCancel}
            className="w-full border border-red-400 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>
  
          <button
            onClick={handleSubmit}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddTurf;
