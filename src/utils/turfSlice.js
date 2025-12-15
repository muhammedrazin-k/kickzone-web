import { createSlice } from "@reduxjs/toolkit";

const turfSlice=createSlice({
    name:"turf",
    initialState:{
        turf:null
    },
    reducers:{
        setTurf:(state,action)=>{
            state.turf=action.payload
        },
        clearTurf:(state)=>{
            state.turf=null
        }
    }
})

export const {setTurf,clearTurf}=turfSlice.actions
export default turfSlice.reducer