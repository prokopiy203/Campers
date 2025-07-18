import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/campersApi";

export const getCampers = createAsyncThunk(
  "campers/fetchAll",
  async (__, thunkAPI) => {
    try {
      const { data } = await api.get("/campers");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCampersByLocation = createAsyncThunk(
  "campers/location",
  async (query, thunkAPI) => {
    try {
      const response = await api.get("/campers", {
        params: query || {},
      });
      console.log("Search", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
