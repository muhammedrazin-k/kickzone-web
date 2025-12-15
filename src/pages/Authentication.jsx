import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import {useDispatch} from 'react-redux'
import axios from "axios";
import { loginApi, signupApi } from "../server/allApi";
import { toast } from "react-toastify";
import validator from 'validator'
import { setUser } from "../utils/userSlice";

const Authentication = ({ isNewUser }) => {
  const [isLoading,setIsLoading]=useState(false)
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const [isEmail,setIsEmail]=useState(true)
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    password: "",
    location: {
      address: "",
      latitude: "",
      longitude: "",
    },
    role: "user",
  });
  const [suggestions, setsuggestions] = useState([]);

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
    setFormData({ ...formData, location: { address: "" } });
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
    setsuggestions([]);
  };

  const handleEmail=(e)=>{
    setFormData({ ...formData, emailId: e.target.value })
    if(validator.isEmail(formData.emailId)){
      setIsEmail(true)
    }
  }
  const handleRegister = async () => {
    if (
      !formData.emailId ||
      !formData.password ||
      !formData.location.address ||
      !formData.name
    ) {
      alert("please fill all the fields including location ");
      return;
    }

    if(!validator.isEmail(formData.emailId)){
      toast.warning('please check your email')
      return
    }
    if(!validator.isStrongPassword(formData.password)){
      toast.warning('make your password strong with capital case and symbol')
    }

    try {
      const result = await signupApi(formData);
      if (result.status === 200) {
        dispatch(setUser(result.data))
        localStorage.setItem("role",result.data?.role)
        setIsLoading(true)
        setTimeout(() => {
          toast.success("Welcome to Kick Zone "+ result.data?.name);
          setIsLoading(false)
          navigate("/");
        }, 1000);
      }
      if(result.status==400){
        toast.warning(result.response.data.message)
        setFormData({
          name: "",
          emailId: "",
          password: "",
          location: {
            address: "",
            latitude: "",
            longitude: "",
          },
          role: "user",
        })
        setQuery('')
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogin=async()=>{
    try {
      if(!formData.emailId || !formData.password){
        toast.warning('fill the input field')
        return
      }

      if(!validator.isEmail(formData.emailId)){
          setIsEmail(false)
          setFormData({
            name: "",
            emailId: "",
            password: "",
            location: {
              address: "",
              latitude: "",
              longitude: "",
            },
            role: "user",
          })
          return
          
      }
      else{
        setIsEmail(true)
      }
      if(!validator.isStrongPassword(formData.password)){
          setIsEmail(false)
          setFormData({
            name: "",
            emailId: "",
            password: "",
            location: {
              address: "",
              latitude: "",
              longitude: "",
            },
            role: "user",
          })
          return
      }

      const result=await loginApi(formData)

      if(result.status==200){
        setIsLoading(true)
      setTimeout(() => {
        dispatch(setUser(result.data))
        localStorage.setItem("user",result.data?.name)
        localStorage.setItem("role",result.data?.role)
        setIsLoading(false)
        toast.success(`welcome to Kick zone ${result.data?.name}`)
        return navigate('/')
      }, 1000);
      }
      if(result.status==400){
        setIsEmail(false)
      }
      
    } catch (err) {
      console.log(err)
      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-gray-900 p-4 relative">

    {/* --- FOOTBALL BACKGROUND DECOR --- */}
    <div className="absolute inset-0 opacity-10 bg-[url('/backgroundimage.jpg')] bg-repeat"></div>

    <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">

      {/* ----------------------------------------------------
          LEFT SIDE (ILLUSTRATION)
      ---------------------------------------------------- */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-500 to-green-700 relative items-center justify-center">
        
        {/* Football Illustration */}
        <img
          src="/kickZone-logo.jpg"
          alt="football"
          className="w-64 opacity-90 animate-pulse rounded-2xl"
        />

        <h2 className="absolute bottom-8 text-white text-2xl font-bold tracking-widest drop-shadow-lg">
          KICK ZONE
        </h2>
      </div>

      {/* ----------------------------------------------------
          RIGHT SIDE (FORM)
      ---------------------------------------------------- */}
      <div className="w-full md:w-1/2 p-8 md:p-10 bg-white">

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 text-center tracking-wide">
          {isNewUser ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-center text-gray-500 mt-1 mb-6 text-sm">
          {isNewUser ? "Start your journey with Kick Zone" : "Login to continue your play time!"}
        </p>

        <div className="space-y-5">
          {isNewUser && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full input rounded-lg bg-gray-100 border border-gray-300 px-3 py-3 focus:ring-2 focus:ring-green-600"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          )}

          <input
            type="text"
            placeholder="Email Address"
            className="w-full input rounded-lg bg-gray-100 border border-gray-300 px-3 py-3 focus:ring-2 focus:ring-green-600"
            value={formData.emailId}
            onChange={(e) => handleEmail(e)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full input rounded-lg bg-gray-100 border border-gray-300 px-3 py-3 focus:ring-2 focus:ring-green-600"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          {isNewUser && (
            <>
              <p className="font-semibold text-gray-700">Select Role</p>
              <div className="flex gap-6 text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  User
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={formData.role === "owner"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  Owner
                </label>
              </div>

              {/* Location Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your location"
                  className="w-full input rounded-lg bg-gray-100 border border-gray-300 px-3 py-3 focus:ring-2 focus:ring-green-600"
                  value={formData.location.address || query}
                  onChange={(e) => handleLocation(e)}
                />

                {suggestions.length > 0 && (
                  <div className="absolute z-10 bg-white w-full shadow-lg rounded-lg mt-2 max-h-40 overflow-y-auto">
                    {suggestions.map((place) => (
                      <div
                        key={place.osm_id}
                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                        onClick={() => handleSelection(place)}
                      >
                        {place.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Switch Link */}
        <div className="mt-5 text-center">
          {isNewUser ? (
            <Link to={"/login"} className="text-green-700 font-semibold hover:underline">
              Already have an account?
            </Link>
          ) : (
            <Link to={"/register"} className="text-green-700 font-semibold hover:underline">
              Create new account
            </Link>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={isNewUser ? handleRegister : handleLogin}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl mt-6 font-bold tracking-wide shadow-lg"
        >
          {isLoading ? <span className="loading loading-spinner text-white"></span> : (isNewUser ? "Register" : "Login")}
        </button>

        {!isNewUser && !isEmail && (
          <p className="text-red-600 text-center text-sm mt-3">Invalid credentials</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default Authentication;
