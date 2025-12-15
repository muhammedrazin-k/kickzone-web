import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import LogoHeader from "./LogoHeader";
import {
  deleteBookingHistoryApi,
  getUserBookingHistoryApi,
} from "../../server/allApi";
import { toast } from "react-toastify";

const History = () => {
  const [history, setHistory] = useState([]);

  const handleDelete = async (bookingId) => {
    try {
      const res = await deleteBookingHistoryApi(bookingId);
      if (res.status == 200) {
        toast.success("successfully deleted the history");
        getHistory();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getHistory = async () => {
    try {
      const res = await getUserBookingHistoryApi();
      if (res.status == 200) {
        setHistory(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="bg-gray-200 pt-20 w-full min-h-[100vh] pb-20">
      <UserHeader />
      <LogoHeader />

      <div className="bg-white m-6 md:m-10 rounded-2xl">
        <div className='p-6 font-["figtree"] border-b-1 flex justify-between'>
          <h1 className="text-lg sm:text-2xl">Booking History</h1>
          <p className="text-red-500 my-auto cursor-pointer text-sm sm:text-lg">
            Clear History
          </p>
        </div>

        <div>
          <div className="overflow-x-auto">
            <table className="table table-sm sm:table-md">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Turfs</th>
                  <th>Location</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th>SlotType</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map((eachHistory,index) => (
                    <tr key={index}>
                      <th>{eachHistory.bookingDate.split("T")[0]}</th>
                      <td>{eachHistory.turfId.turfName} </td>
                      <td>{eachHistory.turfId?.location?.address}</td>
                      <td>
                        {new Date(eachHistory.startTime).toLocaleTimeString()} -{" "}
                        {new Date(eachHistory.endTime).toLocaleTimeString()}
                      </td>
                      <td>${eachHistory.amount}</td>
                      <td>{eachHistory.slot}</td>
                      <td>
                        <i
                          className="fa-solid fa-trash cursor-pointer hover:text-red-500"
                          onClick={() => handleDelete(eachHistory._id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-red-500 py-4">
                      There is no history yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
