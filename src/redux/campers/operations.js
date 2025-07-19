import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/campersApi";

export const getCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page = 1, limit = 4 } = {}, thunkAPI) => {
    try {
      const response = await api.get("/campers", {
        params: { page, limit },
      });

      return {
        items: response.data.items,
        total: response.data.total,
        page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCampersByLocation = createAsyncThunk(
  "campers/location",
  async (filters, thunkAPI) => {
    try {
      const { page = 1, limit = 4, ...query } = filters;

      const response = await api.get("/campers", {
        params: { ...query, page, limit },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
