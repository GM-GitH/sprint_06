import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../features/rooms/roomsSlice";
import usersReducer from "../features/users/usersSlice";
import bookingsReducer from "../features/bookings/bookingsSlice";
// import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    users: usersReducer,
    bookings: bookingsReducer,
  },
});
export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
