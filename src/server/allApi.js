import commonApi from "./commonApi"
import SERVER_URL from "./serverURL"

export const signupApi=async(reqBody)=>{
    return await commonApi('POST',`${SERVER_URL}/signup`,reqBody)
}

export const loginApi=async(reqBody)=>{
    return await commonApi('POST',`${SERVER_URL}/login`,reqBody)
}

export const getMeApi=async()=>{
    return await commonApi('GET',`${SERVER_URL}/me`,"")
}

export const addTurfApi=async(reqBody)=>{
    return await commonApi('POST',`${SERVER_URL}/owner/addturf`,reqBody)
}

export const getOwnerTurf=async(reqBody)=>{
    return await commonApi('get',`${SERVER_URL}/owner/getmyturfs`,"")
}

export const logoutApi=async()=>{
    return await commonApi('delete',`${SERVER_URL}/logout`)
}

export const AllTurfApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/getallturfs`,"")
}

export const getTurfDetailsApi=async(reqParams)=>{
    return await commonApi('get',`${SERVER_URL}/getturf/${reqParams}`,"")
}

export const getbookingsApi=async(reqParams)=>{
    return await commonApi('get',`${SERVER_URL}/getbookings/${reqParams}`,"")
}

export const bookTurfApi=async(reqParams,reqBody)=>{
    return await commonApi('post',`${SERVER_URL}/bookturf/${reqParams}`,reqBody)
}

export const getAllUserBookingsApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/get-all-bookings`,"")
}

export const getUserBookingHistoryApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/getbookings/history`,"")
}

export const deleteBookingHistoryApi=async(bookingId)=>{
    return await commonApi('delete',`${SERVER_URL}/deletehistory/${bookingId}`,"")
}

export const updateProfileApi=async(reqBody)=>{
    return await commonApi('patch',`${SERVER_URL}/profile/edit`,reqBody)
}

export const dashboardOverviewApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/owner/dashboard`,"")
}

export const allBookingsApi=async()=>{
     return await commonApi('get',`${SERVER_URL}/owner/bookings`,"")
}

export const adminDashboardApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/admin/dashboardoverview`,"")
}

export const getAllownerApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/admin/allOwners`,"")
}

export const getOwnerDetailsApi=async(id)=>{
    return await commonApi('get',`${SERVER_URL}/admin/ownerdetails/${id}`,"")
}
export const blockuserApi=async(id,reqBody)=>{
    return await commonApi('patch',`${SERVER_URL}/admin/blockuser/${id}`,reqBody)
}

export const allUsersApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/admin/allusers`,"")
}

export const approveTurfApi=async(id,reqBody)=>{
    return await commonApi('patch',`${SERVER_URL}/admin/turf/${id}/approve`,reqBody)
}
export const rejectTurfApi=async(id,reqBody)=>{
    return await commonApi('patch',`${SERVER_URL}/admin/turf/${id}/block`,reqBody)
}   

export const getAdminallturfsApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/admin/Allturfs`,"")
}

export const getAllBookingsApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/admin/allbookings`,"")
}

export const updateTurfApi=async(id,reqBody)=>{
    return await commonApi('patch',`${SERVER_URL}/owner/manageturf/${id}`,reqBody)
}

export const getMyturfbyidAPI=async(id)=>{
    return await commonApi('get',`${SERVER_URL}/owner/getmyturf/${id}`,"")
}

export const deleteTurfApi=async(id)=>{
    return await commonApi('delete',`${SERVER_URL}/owner/deletturf/${id}`,"")
}