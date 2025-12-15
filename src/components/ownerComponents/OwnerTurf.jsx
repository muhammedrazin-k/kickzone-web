import React, { useEffect, useState } from "react";
import OwnerDrawer from "./OwnerDrawer";
import { Link } from "react-router-dom";
import { deleteTurfApi, getOwnerTurf } from "../../server/allApi";
import SERVER_URL from "../../server/serverURL";
import { toast } from "react-toastify";

const OwnerTurf = () => {
  const [turfs, setTurfs] = useState([]);

  const handleDelete=async(turfId)=>{
    try {
      const res=await deleteTurfApi(turfId)
      if(res.status==401){
        toast.warning('cannot delete: turf has future bookings')
      }
      if(res.status==200){

        toast.success('successfully deleted your turf')
        fetchOwnerTurf()
      }
      
    } catch (err) {
      console.log(err.message)
      
    }
  }

  const fetchOwnerTurf = async () => {
    try {
      const res = await getOwnerTurf();
      setTurfs(res.data?.data);
    } catch (err) {
      console.error("Error fetching turf:", err);
    }
  };
  useEffect(() => {
    fetchOwnerTurf();
  }, []);



  
  return (
    <div className="bg-gray-100 min-h-screen w-full md:flex">

  {/* Drawer */}
  <OwnerDrawer />

  <div className="flex-1 overflow-y-auto py-20 md:py-10 px-4 md:px-10 font-['figtree']">

    {/* Header */}
    <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-6 rounded-3xl shadow-lg mb-10">
      <h1 className="text-3xl text-white font-semibold">My Turfs</h1>
      <p className="text-sm text-gray-200 mt-1">
        Manage all your registered turfs in one place
      </p>
    </div>

    {/* Main List Container */}
    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200">

      {turfs.length > 0 ? (
        turfs.map((turf) => (
          <div
            key={turf._id}
            className="
              grid lg:grid-cols-2 gap-8 items-center 
              bg-gray-50 border border-gray-200 rounded-2xl shadow-sm 
              p-5 my-6 hover:shadow-xl hover:-translate-y-1 transition-all
            "
          >

            {/* Image Section */}
            <div className="w-full h-60 rounded-2xl overflow-hidden shadow-sm">
              <img
                src={`${SERVER_URL}/uploads/${turf.turfImage}`}
                alt="Turf"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Details + Buttons */}
            <div className="flex flex-col justify-between h-full">

              {/* Turf Info */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {turf.turfName}
                </h2>

                <p className="text-gray-600 mt-2 flex items-center">
                  📍 <span className="ml-1 font-medium">{turf.location.address}</span>
                </p>

                {/* Status Badge */}
                <div className="mt-4">
                  <span
                    className={`
                      px-4 py-1.5 rounded-full text-sm font-semibold
                      ${
                        turf.turfStatus === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }
                    `}
                  >
                    {turf.turfStatus}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-4">

                {/* Manage Button */}
                <Link to={`/owner/turf/${turf._id}`} className="w-full">
                  <button
                    disabled={turf.turfStatus === "pending"}
                    className="
                      w-full px-6 py-3 rounded-xl shadow-md font-medium
                      bg-emerald-600 hover:bg-emerald-700
                      disabled:bg-gray-400 disabled:cursor-not-allowed
                      text-white transition
                    "
                  >
                    Manage Turf
                  </button>
                </Link>

                {/* Delete Button */}
                <button
                  disabled={turf.turfStatus === "pending"}
                  onClick={() => handleDelete(turf._id)}
                  className="
                    w-full px-6 py-3 rounded-xl shadow-md font-medium
                    bg-red-600 hover:bg-red-700 text-white
                    disabled:bg-gray-400 disabled:cursor-not-allowed 
                    transition
                  "
                >
                  Delete Turf
                </button>
              </div>

            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 py-10 text-lg">
          You have not added any turfs yet.
        </p>
      )}

    </div>
  </div>
</div>
  );
};

export default OwnerTurf;
