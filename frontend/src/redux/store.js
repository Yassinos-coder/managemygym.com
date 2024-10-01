import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import GymReducer from "./GymReducer";

const Store = configureStore({
  reducer: {
    UserReducer: UserReducer,
    GymReducer: GymReducer
  },
});

export default Store;
