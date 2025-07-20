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
    const { page = 1, limit = 4, ...query } = filters;

    try {
      const response = await api.get("/campers", {
        params: { ...query, page, limit },
      });

      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return { items: [], total: 0 };
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCamperById = createAsyncThunk(
  "campers/getById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/campers/${id}`);

      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return thunkAPI.rejectWithValue("Camper not found");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
