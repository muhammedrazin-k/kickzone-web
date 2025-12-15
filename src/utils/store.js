import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import turfSlice from './turfSlice'

 const store=configureStore({
    reducer:{
        user:userSlice,
        turf:turfSlice
        
    }
})

export default store