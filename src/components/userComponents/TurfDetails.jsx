import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import LogoHeader from "./LogoHeader";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { bookTurfApi, getbookingsApi, getTurfDetailsApi } from "../../server/allApi";
import SERVER_URL from "../../server/serverURL";
import CardShimmers from "../../shimmers/CardShimmers";
import { toast } from "react-toastify";

const TurfDetails = () => {
  const {turfId}=useParams()
  const [turfDetails,setTurfDetails]=useState('')
  const [isShimmer,setIsShimmer]=useState(true)
  const [myBookings, setMyBookings]=useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [selectOption, setSelectOption] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [showEndModal, setShowEndModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const slots = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];

  const navigate=useNavigate()

  const formatTo12Hour = (time24) => {
    if (!time24) return "";
    const [hourStr, min] = time24.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${min} ${ampm}`;
  };

  const handleStartSelect = (time) => {
    setSelectedStartTime(time);
    setShowEndModal(true);
    setSelectedEndTime(null);
  };

  const handleEndSelect = (time) => {
    setSelectedEndTime(time);
    setShowEndModal(false);
  };
  const getTurfDetails=async()=>{
    try {
      const res=await getTurfDetailsApi(turfId)
      const turf=res.data.data
      setTurfDetails(res.data.data)
      if(turf.slots && turf.slots.length>0){
        setSelectOption(turf.slots[0].type)
      }
      setIsShimmer(false)
    } catch (err) {
      console.log(err)
    }
  }
  const getBookings=async()=>{
    try {
      const res=await getbookingsApi(turfId)
      if(res.status==200){
        setMyBookings(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleBookingConfirm =async() => {
    if (!startDate || !selectedStartTime || !selectedEndTime || !selectOption) {
      alert("Please fill all required fields before booking.");
      return;
    }
    const newBooking = {
      
      bookingDate: startDate.toDateString(),
      slotType: selectOption,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    };

    const result=await bookTurfApi(turfId,newBooking)
    setBookings([...bookings, newBooking]);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
    getBookings()
    toast.success('successfully conformed your slot')
    navigate('/user/all-bookings')
    
  };

  // Check if a button is in the selected range
  const isInRange = (time) => {
    if (!selectedStartTime || !selectedEndTime) return false;
    const startIndex = slots.indexOf(selectedStartTime);
    const endIndex = slots.indexOf(selectedEndTime);
    const currentIndex = slots.indexOf(time);
    return currentIndex >= startIndex && currentIndex <= endIndex;
  };


  

  useEffect(()=>{
getTurfDetails()
getBookings()
  },[])

  const bookingForSelectedDates=myBookings.filter((b)=>{
    const inputdate=startDate.toDateString()
    const bookingDay=new Date(b.bookingDate).toDateString()
    return(
      bookingDay==inputdate &&
      b.slot==selectOption 
      
      
    )
  })

  const bookingForEndDate=myBookings.filter((b)=>{
    const inputdate=startDate.toDateString()
    const bookingday=new Date(b.bookingDate).toDateString()

    const startingbooking= new Date(`${inputdate} ${selectedStartTime}`).getTime()

    return(
      bookingday==inputdate &&
      b.slot==selectOption
      
    )
  })

  if(isShimmer){
    return (
      <CardShimmers/>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-green-200 via-gray-100 to-white">
    <UserHeader />
    <LogoHeader />
  
    {/* ======================= TOP SECTION: TURF + CALENDAR ======================= */}
    <div className="m-6 md:m-10 rounded-3xl p-6 md:p-10 bg-white/70 backdrop-blur-xl shadow-2xl border border-white/50">
  
      <div className="md:flex gap-10">
  
        {/* ---------------- TURF CARD ---------------- */}
        <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-xl border border-white/40 bg-white/80">
  
          <div className="relative group">
            <img
              src={`${SERVER_URL}/uploads/${turfDetails?.turfImage}`}
              alt="Turf"
              className="w-full h-80 object-cover transition duration-700 group-hover:scale-105"
            />
  
            <div className="absolute top-4 left-4 bg-green-600/90 text-white px-4 py-1
                            rounded-full shadow-xl text-sm backdrop-blur-xl">
              Available Now
            </div>
          </div>
  
          <div className="px-6 py-5">
            <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">
              {turfDetails?.turfName}
            </h1>
  
            <p className="mt-3 text-gray-700 flex items-center gap-2 text-lg">
              <i className="ri-map-pin-line text-green-700 text-xl"></i>
              {turfDetails.location.address}
            </p>
  
          </div>
        </div>
  
        {/* ---------------- RIGHT SIDE: CALENDAR + SLOT TYPE ---------------- */}
        <div className="md:w-1/2 flex flex-col items-center gap-8 mt-8 md:mt-0">
  
          {/* Calendar */}
          <div className="w-full rounded-2xl shadow-xl border border-white/40 bg-white/80 backdrop-blur-xl p-4 flex flex-col items-center">
            <h1 className="text-center text-lg font-semibold text-gray-800 mb-2">
              Select a Date
            </h1>
  
            <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-inner p-1">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 1)}
                inline
                calendarClassName="!p-1 !m-0"
              />
            </div>
          </div>
  
          {/* Slot Type */}
          <div className="w-full text-center">
            <h1 className="font-semibold text-gray-800 text-lg mb-3">Select Slot Type</h1>
  
            <div className="flex justify-center gap-3 flex-wrap">
              {turfDetails.slots.map((slot) => (
                <label
                  key={slot.type}
                  className={`px-5 py-2 rounded-full cursor-pointer transition-all shadow-md border ${
                    selectOption === slot.type
                      ? "bg-green-600 text-white scale-110 shadow-lg border-green-700"
                      : "bg-white text-gray-700 hover:bg-green-50 border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="slotType"
                    className="hidden"
                    checked={selectOption === slot.type}
                    value={slot.type}
                    onChange={(e) => setSelectOption(e.target.value)}
                  />
                  {slot.type}
                </label>
              ))}
            </div>
          </div>
  
        </div>
      </div>
  
      {/* ======================= FULL-WIDTH BOTTOM SECTION ======================= */}
      <div className="mt-12 w-full text-center">
  
        {/* Time Selection */}
        <h1 className="text-xl font-semibold text-gray-800">Select Time</h1>
  
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {slots.map((time) => {
            const isbooked = bookingForSelectedDates.some((b) => {
              const bookStart = new Date(b.startTime).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              });
              const bookedEnd = new Date(b.endTime).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              });
  
              const startIndex = slots.indexOf(bookStart);
              const endIndex = slots.indexOf(bookedEnd);
              const currentIndex = slots.indexOf(time);
  
              return currentIndex >= startIndex && currentIndex < endIndex;
            });
  
            return (
              <button
                key={time}
                disabled={isbooked}
                onClick={() => handleStartSelect(time)}
                className={`px-5 py-2 rounded-xl text-lg font-medium shadow-md transition-all ${
                  isbooked
                    ? "bg-red-400 cursor-not-allowed text-white"
                    : "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
  
        {/* Confirm Button */}
        <button
          onClick={handleBookingConfirm}
          className="mt-10 bg-green-600 hover:bg-green-700 text-white font-semibold 
                     px-12 py-3 rounded-full shadow-2xl transition-all hover:scale-110"
        >
          Confirm Booking
        </button>
  
      </div>
    </div>
  
    {/* ======================= END TIME MODAL ======================= */}
    {showEndModal && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl w-80 border border-white/50">
  
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
            Select End Time (1–3 hours max)
          </h2>
  
          <div className="grid grid-cols-3 gap-3">
            {slots
              .slice(
                slots.indexOf(selectedStartTime) + 1,
                slots.indexOf(selectedStartTime) + 4
              )
              .map((time) => {
                const selectedIndex = slots.indexOf(selectedStartTime);
                const currentIndex = slots.indexOf(time);
  
                const isBooked = bookingForSelectedDates.some((b) => {
                  const bookStart = new Date(b.startTime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  });
                  const bookEnd = new Date(b.endTime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  });
  
                  const startIndex = slots.indexOf(bookStart);
                  const endIndex = slots.indexOf(bookEnd);
  
                  return selectedIndex < endIndex && startIndex < currentIndex;
                });
  
                return (
                  <button
                    key={time}
                    disabled={isBooked}
                    onClick={() => handleEndSelect(time)}
                    className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all ${
                      isBooked
                        ? "bg-gray-300 cursor-not-allowed text-white"
                        : "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
          </div>
  
          <button
            onClick={() => setShowEndModal(false)}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition shadow-md"
          >
            Cancel
          </button>
  
        </div>
      </div>
    )}
  
  </div>
  );
};

export default TurfDetails;
