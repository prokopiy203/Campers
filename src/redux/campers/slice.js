import { createSlice } from "@reduxjs/toolkit";
import { getCampers, getCampersByLocation } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  items: [],
  // filters: {
  //   location: "",
  //   vehicleType: "",
  //   equipment: [],
  // },
  favorites: [],
  error: null,
  isLoading: false,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getCampers.pending, handlePending)
      .addCase(getCampers.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getCampers.rejected, handleRejected)
      .addCase(getCampersByLocation.pending, handlePending)
      .addCase(getCampersByLocation.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getCampersByLocation.rejected, handleRejected),
});
export const campersReducer = campersSlice.reducer;
