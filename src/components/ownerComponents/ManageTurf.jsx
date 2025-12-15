import React, { useCallback, useEffect, useState } from "react";
import OwnerDrawer from "./OwnerDrawer";
import debounce from "lodash.debounce";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getMyturfbyidAPI, updateTurfApi } from "../../server/allApi";
import SERVER_URL from "../../server/serverURL";
import { toast } from "react-toastify";

const ManageTurf = () => {
  const { id } = useParams();

  const [suggestions, setsuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState("");

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

  // LOCATION SEARCH
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
      setsuggestions([]);
    }
  };

  const debouncedSearch = useCallback(debounce(searchLocation, 1000), []);

  const handleLocation = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
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

  // IMAGE PREVIEW
  const addImage = (e) => {
    setFormData({ ...fromData, turfImage: e.target.files[0] });
    setPreview(e.target.files[0]);
  };

  // SLOTS CHECKBOX
  const handleSlotCheck = (type) => {
    setFormData((prev) => {
      const exists = prev.slots?.find((s) => s.type === type);
      if (exists) {
        return { ...prev, slots: prev.slots.filter((s) => s.type !== type) };
      } else {
        return { ...prev, slots: [...(prev.slots || []), { type, price: "" }] };
      }
    });
  };

  const handleSlotPriceChange = (type, price) => {
    setFormData((prev) => ({
      ...prev,
      slots: prev.slots.map((s) => (s.type === type ? { ...s, price } : s)),
    }));
  };

  // FACILITY CHECKBOX
  const handleFacilityToggle = (facility) => {
    setFormData((prev) => {
      if (prev.facilities?.includes(facility)) {
        return {
          ...prev,
          facilities: prev.facilities.filter((f) => f !== facility),
        };
      } else {
        return { ...prev, facilities: [...(prev.facilities || []), facility] };
      }
    });
  };

  const handleCancel = () => {
    getturf();
    setPreview("");
  };

  const handleUpdate = async () => {
    try {
      const {
        turfName,
        turfImage,
        location,
        contactNumber,
        slots,
        availability,
        facilities,
      } = fromData;

      const reqBody = new FormData();

      reqBody.append("turfName", turfName);
      reqBody.append("turfImage", turfImage);
      reqBody.append("location", JSON.stringify(location));
      reqBody.append("contactNumber", contactNumber);
      reqBody.append("slots", JSON.stringify(slots));
      reqBody.append("availability", JSON.stringify(availability));
      reqBody.append("facilities", JSON.stringify(facilities));

      const res=await updateTurfApi(id,reqBody)
      toast.success('successfully updated your turf details')
      getturf()
    } catch (err) {
      console.log(err.message);
    }
  };

  const getturf = async () => {
    try {
      const res = await getMyturfbyidAPI(id);
      setFormData({
        turfName: res.data?.data?.turfName,
        turfImage: res.data?.data?.turfImage,
        location: {
          address: res.data?.data?.location?.address,
          longitude: res.data?.data?.location?.coordinates[0],
          latitude: res.data?.data?.location?.coordinates[1],
        },
        contactNumber: res.data?.data?.contactNumber,
        slots: res.data?.data?.slots,
        availability: {
          from: res.data?.data?.availability?.from,
          to: res.data?.data?.availability?.to,
        },
        facilities: res.data?.data?.facilities,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getturf();
  }, []);
  return (
    <div className="min-h-screen w-full md:flex bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="overflow-y-auto w-full p-8 h-screen">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 p-6 rounded-3xl shadow-xl mb-8">
          <h1 className="text-white text-3xl font-bold tracking-wide">
            Manage Turf
          </h1>
          <p className="text-green-100 mt-1 text-sm">
            Update your turf details and settings
          </p>
        </div>

        {/* FORM WRAPPER CARD */}
        <div className="backdrop-blur-xl bg-white/60 shadow-xl border border-white/40 rounded-3xl p-8">
          {/* IMAGE + BASIC DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IMAGE UPLOAD */}
            <div>
              <label className="block">
                <input type="file" className="hidden" onChange={addImage} />
                <div className="relative group cursor-pointer">
                  <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-300 bg-gray-200 hover:shadow-2xl transition-all duration-300">
                    <img
                      src={
                        preview
                          ? URL.createObjectURL(preview)
                          : `${SERVER_URL}/uploads/${fromData.turfImage}`
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs px-4 py-1 rounded-full shadow-md opacity-80">
                    Upload Image
                  </span>
                </div>
              </label>
            </div>

            {/* RIGHT INPUTS */}
            <div className="space-y-6">
              {/* TURF NAME */}
              <div>
                <label className="text-sm text-gray-700 font-semibold">
                  Turf Name
                </label>
                <input
                  type="text"
                  value={fromData.turfName}
                  onChange={(e) =>
                    setFormData({ ...fromData, turfName: e.target.value })
                  }
                  placeholder="Ex: Green Field Arena"
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="text-sm text-gray-700 font-semibold">
                  Turf Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fromData.location.address || query}
                    onChange={handleLocation}
                    placeholder="Search location..."
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  {suggestions.length > 0 && (
                    <div className="absolute bg-white shadow-xl rounded-xl mt-2 w-full border border-gray-200 max-h-48 overflow-y-auto z-20">
                      {suggestions.map((place) => (
                        <div
                          key={place.osm_id}
                          onClick={() => handleSelection(place)}
                          className="px-4 py-2 text-sm hover:bg-green-100 cursor-pointer border-b"
                        >
                          {place.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CONTACT NUMBER */}
              <div>
                <label className="text-sm text-gray-700 font-semibold">
                  Contact Number
                </label>
                <input
                  type="tel"
                  maxLength="10"
                  value={fromData.contactNumber}
                  onChange={(e) =>
                    setFormData({ ...fromData, contactNumber: e.target.value })
                  }
                  placeholder="Enter contact number"
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION DIVIDER */}
          <div className="border-t border-gray-300 my-10"></div>

          {/* SLOTS SECTION */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Slots</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {allSlots.map((slotType) => (
              <div
                key={slotType}
                className="bg-white/80 border shadow-md rounded-xl p-4 flex items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={fromData.slots.some((s) => s.type === slotType)}
                  onChange={() => handleSlotCheck(slotType)}
                  className="w-5 h-5 accent-green-600"
                />

                <span className="font-semibold text-gray-700 w-10">
                  {slotType}
                </span>

                {fromData.slots.some((s) => s.type === slotType) && (
                  <input
                    type="number"
                    placeholder="Price"
                    value={
                      fromData.slots.find((s) => s.type === slotType)?.price ||
                      ""
                    }
                    onChange={(e) =>
                      handleSlotPriceChange(slotType, e.target.value)
                    }
                    className="px-3 py-2 w-28 rounded-lg bg-white border border-gray-300 shadow focus:ring-2 focus:ring-green-500"
                  />
                )}
              </div>
            ))}
          </div>

          {/* SECTION DIVIDER */}
          <div className="border-t border-gray-300 my-10"></div>

          {/* AVAILABILITY SECTION */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Availability
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Available From
              </label>
              <input
                type="time"
                value={fromData.availability.from}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      from: e.target.value,
                    },
                  }))
                }
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white border border-gray-300 shadow focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Available To
              </label>
              <input
                type="time"
                value={fromData.availability.to}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: { ...prev.availability, to: e.target.value },
                  }))
                }
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white border border-gray-300 shadow focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* SECTION DIVIDER */}
          <div className="border-t border-gray-300 my-10"></div>

          {/* FACILITIES SECTION */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Facilities
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            {allFacilities.map((facility) => (
              <label
                key={facility}
                className="flex items-center gap-3 bg-white/70 shadow-md rounded-xl p-3 cursor-pointer hover:bg-green-50 transition"
              >
                <input
                  type="checkbox"
                  checked={fromData.facilities.includes(facility)}
                  onChange={() => handleFacilityToggle(facility)}
                  className="w-5 h-5 accent-green-600"
                />
                <span className="text-gray-700">{facility}</span>
              </label>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">
            <button
              className="w-full py-3 rounded-xl border border-red-400 text-red-600 hover:bg-red-500 hover:text-white transition"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="w-full py-3 rounded-xl bg-green-700 text-white hover:bg-green-800 shadow-md"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTurf;
