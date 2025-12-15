import React, { useCallback, useEffect, useState } from "react";
import OwnerDrawer from "./OwnerDrawer";
import { useSelector } from "react-redux";
import axios from "axios";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { updateProfileApi } from "../../server/allApi";
import SERVER_URL from "../../server/serverURL";
import CardShimmers from "../../shimmers/CardShimmers";

const OwnerProfile= () => {
  const storeUser = useSelector((store) => store.user);
  const [isShimmer,setShimmer]=useState(true)
  const [formData, setFormData] = useState({
    name: "",
    location: {
      address: "",
      latitude: "",
      longitude: "",
    },
    email:"",
    phone: "",
    profileImg: "",
  });

  const [preview, setPreview] = useState("");

  const [query, setQuery] = useState("");

  const [suggestions, setSuggetions] = useState([]);

  const searchLocation = async (value) => {
    try {
      if (value.length > 2) {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5&countrycodes=IN`
        );

        setSuggetions(res.data);

      } else {
        setSuggetions([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedSearch = useCallback(debounce(searchLocation, 1000), []);
  const handleLocation = (e) => {
    try {
      setQuery(e.target.value);

      debouncedSearch(e.target.value);
      setFormData({ ...formData, location: { address: "" } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelection = (place) => {
    setFormData({
      ...formData,
      location: {
        address: place.display_name,
        latitude: place.lat,
        longitude: place.lon,
      },
    });
    setSuggetions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqBody = new FormData();

      reqBody.append("name", formData.name);
      reqBody.append("address", formData.location?.address);
      reqBody.append("latitude", formData.location?.latitude);
      reqBody.append("longitude", formData.location?.longitude);
      reqBody.append("phone", formData?.phone);

      if (preview) {
        reqBody.append("profileImg", preview);
      }

      const res = await updateProfileApi(reqBody);
      if (res.status == 200) {
        toast.success("successfully updated");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel=()=>{
    setFormData({
        name: storeUser.user?.name || "",
        location: {
          address: storeUser.user.address || "",
          latitude: storeUser.user.location?.coordinates?.[0] || "",
          longitude: storeUser.user.location?.coordinates?.[1] || "",
        },
        email:storeUser.user.emailId || "",
        phone: storeUser.user?.phone || "",
        profileImg: storeUser.user.profileImg || "",
      });
  }
  useEffect(() => {

    if (storeUser?.user) {
      setFormData({
        name: storeUser.user?.name || "",
        location: {
          address: storeUser.user.address || "",
          latitude: storeUser.user.location?.coordinates?.[0] || "",
          longitude: storeUser.user.location?.coordinates?.[1] || "",
        },
        email:storeUser.user.emailId,
        phone: storeUser.user?.phone || "",
        profileImg: storeUser.user.profileImg || "",
      });

      
      setShimmer(false)

    }
  }, [storeUser]);

  if(isShimmer){
    return(
      <CardShimmers/>
    )
  }

  return (
    <div className="bg-gray-100 w-full md:flex min-h-screen font-['figtree']">
    <OwnerDrawer />
  
    <div className="flex-1 overflow-y-auto p-6 md:p-10 h-screen">
  
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-6 rounded-3xl shadow-lg">
        <h1 className="text-2xl text-white font-semibold">My Profile</h1>
        <p className="text-gray-200 text-sm mt-1">
          Manage your personal information and account details
        </p>
      </div>
  
      {/* Profile Edit + Preview Section */}
      <div className="bg-white rounded-3xl p-8 mt-8 shadow-md border border-gray-200">
  
        <div className="grid lg:grid-cols-2 gap-12">
  
          {/* Left Section — Edit Form */}
          <div>
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8">
              <img
                src={
                  preview
                    ? URL.createObjectURL(preview)
                    : `${SERVER_URL}/uploads/${formData?.profileImg}`
                }
                className="w-40 h-40 rounded-full shadow-lg object-cover border-4 border-white"
                alt="profile"
              />
  
              <label className="mt-4 text-emerald-600 font-medium cursor-pointer hover:underline">
                Change Profile Photo
                <input
                  type="file"
                  hidden
                  onChange={(e) => setPreview(e.target.files[0])}
                />
              </label>
            </div>
  
            {/* Fields */}
            <div className="space-y-5">
  
              <div>
                <label className="text-gray-700 font-medium">User Name</label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-600 outline-none transition"
                  value={formData?.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter name"
                />
              </div>
  
              <div>
                <label className="text-gray-700 font-medium">Mobile Number</label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-600 outline-none transition"
                  value={formData?.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter mobile number"
                />
              </div>
  
              <div className="relative">
                <label className="text-gray-700 font-medium">Location</label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-600 outline-none transition"
                  value={
                    formData.location?.address
                      ? formData.location.address
                      : query
                  }
                  onChange={(e) => handleLocation(e)}
                  placeholder="Enter location"
                />
  
                {suggestions.length > 0 && (
                  <div className="absolute bg-white w-full rounded-xl shadow-xl border border-gray-200 mt-1 z-10 max-h-40 overflow-y-auto">
                    {suggestions.map((place) => (
                      <div
                        key={place.osm_id}
                        onClick={() => handleSelection(place)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b"
                      >
                        {place.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
  
              {/* Buttons */}
              <div className="flex gap-4 pt-3">
                <button
                  onClick={handleCancel}
                  className="w-full border border-red-500 text-red-600 py-2 rounded-xl hover:bg-red-500 hover:text-white transition"
                >
                  Cancel
                </button>
  
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="w-full bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 shadow-md transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
  
          {/* Right Section — Profile Preview Card */}
          <div className="flex justify-center items-start">
            <div className="w-full rounded-3xl bg-gray-50 p-8 shadow-lg border border-gray-200 text-center">
  
              <img
                src={
                  preview
                    ? URL.createObjectURL(preview)
                    : `${SERVER_URL}/uploads/${formData.profileImg}`
                }
                alt=""
                className="w-36 h-36 rounded-full mx-auto shadow-lg object-cover border-4 border-white"
              />
  
              <h1 className="text-2xl font-semibold mt-5 text-gray-800">
                {formData.name}
              </h1>
  
              <p className="text-gray-600 mt-1">{formData.phone}</p>
              <p className="text-gray-600 text-sm">{formData.email}</p>
  
              <p className="mt-3 text-gray-800">
                Role: <span className="font-semibold text-emerald-700">{storeUser.user?.role}</span>
              </p>
  
              <p className="mt-3 text-gray-700 text-sm">
                {formData.location.address}
              </p>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </div>
  );
};

export default OwnerProfile;
