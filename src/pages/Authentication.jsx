import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginApi, signupApi } from "../server/allApi";
import { toast } from "react-toastify";
import validator from "validator";
import { setUser } from "../utils/userSlice";

const Authentication = ({ isNewUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEmail, setIsEmail] = useState(true);
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

  const handleEmail = (e) => {
    setFormData({ ...formData, emailId: e.target.value });
    if (validator.isEmail(formData.emailId)) {
      setIsEmail(true);
    }
  };
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

    if (!validator.isEmail(formData.emailId)) {
      toast.warning("please check your email");
      return;
    }
    if (!validator.isStrongPassword(formData.password)) {
      toast.warning("make your password strong with capital case and symbol");
    }

    try {
      const result = await signupApi(formData);
      if (result.status === 200) {
        dispatch(setUser(result.data));
        localStorage.setItem("role", result.data?.role);
        setIsLoading(true);
        setTimeout(() => {
          toast.success("Welcome to Kick Zone " + result.data?.name);
          setIsLoading(false);
          navigate("/");
        }, 1000);
      }
      if (result.status == 400) {
        toast.warning(result.response.data.message);
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
        });
        setQuery("");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      if (!formData.emailId || !formData.password) {
        toast.warning("fill the input field");
        return;
      }

      if (!validator.isEmail(formData.emailId)) {
        setIsEmail(false);
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
        });
        return;
      } else {
        setIsEmail(true);
      }
      if (!validator.isStrongPassword(formData.password)) {
        setIsEmail(false);
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
        });
        return;
      }

      const result = await loginApi(formData);

      if (result.status == 200) {
        setIsLoading(true);
        setTimeout(() => {
          dispatch(setUser(result.data));
          localStorage.setItem("user", result.data?.name);
          localStorage.setItem("role", result.data?.role);
          setIsLoading(false);
          toast.success(`welcome to Kick zone ${result.data?.name}`);
          return navigate("/");
        }, 1000);
      }
      if (result.status == 400) {
        setIsEmail(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-emerald-700 via-emerald-600 to-gray-900 p-4"
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl
      overflow-hidden grid md:grid-cols-2"
      >
        {/* ================= LEFT BRAND PANEL ================= */}
        <div
          className="hidden md:flex flex-col justify-center items-center
        bg-gradient-to-br from-emerald-600 to-emerald-800
        text-white px-10"
        >
          <h2 className="text-4xl font-extrabold tracking-widest">KICK ZONE</h2>

          <div className="w-16 h-1 bg-white/70 rounded-full my-6"></div>

          <p className="text-center text-emerald-100 text-sm leading-relaxed">
            Book venues, manage activities, and play smarter.
            <br />
            Everything you need in one place.
          </p>

          <div className="mt-10 text-xs tracking-wider uppercase text-emerald-200">
            Play • Book • Train
          </div>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="w-full p-8 md:p-10 bg-white">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-gray-800 text-center tracking-wide">
            {isNewUser ? "Create Account" : "Welcome Back"}
          </h1>

          <p className="text-center text-gray-500 mt-1 mb-6 text-sm">
            {isNewUser
              ? "Start your journey with Kick Zone"
              : "Login to continue your play time!"}
          </p>

          {/* Form */}
          <div className="space-y-5">
            {isNewUser && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg bg-gray-100 border border-gray-300
           px-4 py-3 focus:ring-2 focus:ring-emerald-600
           focus:outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            )}

            <input
              type="text"
              placeholder="Email Address"
              className="w-full rounded-lg bg-gray-100 border border-gray-300
         px-4 py-3 focus:ring-2 focus:ring-emerald-600
         focus:outline-none"
              value={formData.emailId}
              onChange={(e) => handleEmail(e)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg bg-gray-100 border border-gray-300
         px-4 py-3 focus:ring-2 focus:ring-emerald-600
         focus:outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {isNewUser && (
              <>
                {/* Role */}
                <div>
                  <p className="font-semibold text-gray-700 mb-2">
                    Select Role
                  </p>

                  <div className="flex gap-6 text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={formData.role === "user"}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      />
                      User
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="owner"
                        checked={formData.role === "owner"}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      />
                      Owner
                    </label>
                  </div>
                </div>

                {/* Location */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search your location"
                    className="w-full rounded-lg bg-gray-100 border border-gray-300
               px-4 py-3 focus:ring-2 focus:ring-emerald-600
               focus:outline-none"
                    value={formData.location.address || query}
                    onChange={(e) => handleLocation(e)}
                  />

                  {suggestions.length > 0 && (
                    <div
                      className="absolute z-10 bg-white w-full shadow-lg
                    rounded-lg mt-2 max-h-40 overflow-y-auto"
                    >
                      {suggestions.map((place) => (
                        <div
                          key={place.osm_id}
                          className="px-4 py-2 hover:bg-gray-200
                     cursor-pointer text-sm"
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

          {/* Switch */}
          <div className="mt-5 text-center">
            {isNewUser ? (
              <Link
                to={"/login"}
                className="text-emerald-700 font-semibold hover:underline"
              >
                Already have an account?
              </Link>
            ) : (
              <Link
                to={"/register"}
                className="text-emerald-700 font-semibold hover:underline"
              >
                Create new account
              </Link>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={isNewUser ? handleRegister : handleLogin}
            className="w-full bg-emerald-600 hover:bg-emerald-700
       text-white py-3 rounded-xl mt-6
       font-bold tracking-wide shadow-lg"
          >
            {isLoading ? (
              <span className="loading loading-spinner text-white"></span>
            ) : isNewUser ? (
              "Register"
            ) : (
              "Login"
            )}
          </button>

          {!isNewUser && !isEmail && (
            <p className="text-red-600 text-center text-sm mt-3">
              Invalid credentials
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
