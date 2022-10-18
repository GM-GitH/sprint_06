import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsonData from "../../json/jsonData";
import delay from "../delayFunction"

// const initialState = jsonData;

export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async () => {
  return await delay(jsonData);
});
export const unfetchBookings = createAsyncThunk("bookings/unfetchBookings", async () => {
  console.log("unfetched");
  return await delay([]);
});

export const bookingsSlice = createSlice({
    name: "Bookings",
    initialState: {
      bookings: [],
      status: null,
      loading: null,
    },
    reducers: {
      addBooking: (state, action) => {
        state.push(action.payload);
      },
      editBooking: (state, action) => {
        const { id, avatar, first_name, last_name, email, status, gender, phone, date_start, time_start, date_end, time_end, notes, special_request, price } = action.payload;
        const foundBooking = state.find((booking) => booking.id === id);
        if (foundBooking) {
          foundBooking.avatar = avatar;
          foundBooking.first_name = first_name;
          foundBooking.last_name = last_name;
          foundBooking.email = email;
          foundBooking.status = status;
          foundBooking.gender = gender;
          foundBooking.phone = phone;
          foundBooking.avatar = avatar;
          foundBooking.date_start = date_start;
          foundBooking.time_start = time_start;
          foundBooking.date_end = date_end;
          foundBooking.time_end = time_end;
          foundBooking.notes = notes;
          foundBooking.special_request = special_request;
          foundBooking.price = price;
        }
      },
      deleteBooking: (state, action) => {
        const foundBooking = state.find((booking) => booking.id === action.payload);
        if (foundBooking) {
          state.splice(state.indexOf(foundBooking), 1);
        }
      },
    },extraReducers: (builder) => {
      builder
        .addCase(fetchBookings.pending, (state) => {
          state.loading = true;
          state.status = "loading";
        })
        .addCase(fetchBookings.fulfilled, (state, action) => {
          state.loading = false;
          state.status = "success";
          state.bookings = action.payload;
        })
        .addCase(fetchBookings.rejected, (state) => {
          state.loading = false;
          state.status = "failed";
          state.bookings = [];
        })
        .addCase(unfetchBookings.pending, (state) => {
          state.loading = true;
          state.status = "loading";
        })
        .addCase(unfetchBookings.fulfilled, (state, action) => {
          state.loading = null;
          state.status = null;
          state.bookings = action.payload;
        })
        .addCase(unfetchBookings.rejected, (state) => {
          state.loading = false;
          state.status = "failed";
          state.bookings = [];
        });
    },
  });
  
  // Action creators are genespecial_requestd for each case reducer function
  export const { addBooking, editBooking, deleteBooking } = bookingsSlice.actions;
  
  export default bookingsSlice.reducer;
  