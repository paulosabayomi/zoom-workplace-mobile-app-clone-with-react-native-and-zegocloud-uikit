import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMainState, TUserDetails } from './types'



// Define the initial state using that type
const initialState: IMainState = {
  user_details: {} as TUserDetails,
  call_id: 0
}

export const mainSlice = createSlice({
  name: 'main',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserDetails: (state, action: PayloadAction<TUserDetails>) => {
      state.user_details = action.payload
    },
    setCallId: (state, action: PayloadAction<number>) => {
      state.call_id = action.payload
    },
  },
})

export const { 
    setUserDetails,
    setCallId
} = mainSlice.actions

export default mainSlice.reducer