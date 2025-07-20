import { createSlice } from "@reduxjs/toolkit";
import { getCamperById, getCampers, getCampersByLocation } from "./operations";

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
  camperDetails: null,
  filters: {
    equipment: [],
    transmission: "",
    engine: "",
    form: "",
    location: "",
    page: 1,
    limit: 4,
  },
  favorites: [],
  error: null,
  isLoading: false,
  totalPages: 1,
  hasMore: true,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        equipment: [],
        transmission: "",
        engine: "",
        form: "",
        location: "",
        page: 1,
        limit: 4,
      };
    },
    toggleFavorite(state, action) {
      const camperId = action.payload;
      const isFavorite = state.favorites.includes(camperId);

      if (isFavorite) {
        state.favorites = state.favorites.filter((id) => id !== camperId);
      } else {
        state.favorites.push(camperId);
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCampers.pending, handlePending)
      .addCase(getCampers.fulfilled, (state, action) => {
        const { items, total, page } = action.payload;
        state.isLoading = false;
        state.error = null;

        state.items = page === 1 ? items : [...state.items, ...items];

        state.filters.page = page;
        state.totalPages = Math.ceil(total / state.filters.limit);
        state.hasMore = page < state.totalPages;
      })
      .addCase(getCampers.rejected, handleRejected)
      .addCase(getCampersByLocation.pending, handlePending)
      .addCase(getCampersByLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.filters.page = action.meta.arg.page || 1;

        const newItems = action.payload.items;

        if (state.filters.page === 1) {
          state.items = newItems;
        } else {
          const existingIds = new Set(state.items.map((item) => item.id));
          const filteredNewItems = newItems.filter(
            (item) => !existingIds.has(item.id)
          );

          state.items = [...state.items, ...filteredNewItems];
        }

        state.total = action.payload.total;
        state.hasMore = state.items.length < action.payload.total;
      })
      .addCase(getCampersByLocation.rejected, handleRejected)
      .addCase(getCamperById.pending, handlePending)
      .addCase(getCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.camperDetails = action.payload;
      })
      .addCase(getCamperById.rejected, handleRejected),
});

export const { setFilters, resetFilters, toggleFavorite } =
  campersSlice.actions;
export const campersReducer = campersSlice.reducer;
