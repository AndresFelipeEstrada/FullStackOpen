import { createSlice } from "@reduxjs/toolkit";

const notificacionReducer = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showContent(_state, action) {
      return action.payload
    }
  }
})

export const { showContent } = notificacionReducer.actions
export default notificacionReducer.reducer
