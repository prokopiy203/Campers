import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { campersReducer } from "./campers/slice";

const rooReducer = combineReducers({
  campers: campersReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["campers"],
};

const persistedReducer = persistReducer(persistConfig, rooReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
