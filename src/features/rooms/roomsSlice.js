import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsonRooms from "../../json/jsonRoom";
import delay from "../delayFunction";

// const initialState = jsonRooms;

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  return await delay(jsonRooms);
});
export const unfetchRooms = createAsyncThunk("rooms/unfetchRooms", async () => {
  return await delay([]);
});
export const deleteRooms = createAsyncThunk("rooms/deleteRooms", async (state, action) => {
  const foundRoom = state.rooms.find((room) => room.id === action.payload);
  return state.rooms.splice(state.rooms.indexOf(foundRoom), 1);
});
// export const addRooms = createAsyncThunk("rooms/addRooms", async () => {
//   return await delay(jsonRooms);
// });

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    status: null,
    loading: null,
  },
  reducers: {
    listRooms: (state, action) => {
      state.push(action.payload);
    },
    addRoom: (state, action) => {
      state.push(action.payload);
    },
    editRoom: (state, action) => {
      const { id, avatar, room_id, room_name, bed_type, floor, facilities, rate, status } = action.payload;
      const foundRoom = state.find((room) => room.id === id);
      if (foundRoom) {
        foundRoom.avatar = avatar;
        foundRoom.room_id = room_id;
        foundRoom.room_name = room_name;
        foundRoom.bed_type = bed_type;
        foundRoom.floor = floor;
        foundRoom.facilities = facilities;
        foundRoom.rate = rate;
        foundRoom.status = status;
      }
    },
    deleteRoom: (state, action) => {
      const foundRoom = state.rooms.find((room) => room.id === action.payload);
      if (foundRoom) {
        state.rooms.splice(state.rooms.indexOf(foundRoom), 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
        state.rooms = [];
      })
      .addCase(unfetchRooms.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(unfetchRooms.fulfilled, (state, action) => {
        state.loading = null;
        state.status = null;
        state.rooms = action.payload;
      })
      .addCase(unfetchRooms.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
        state.rooms = [];
      })
      .addCase(deleteRooms.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.rooms = action.payload;
      })
      .addCase(deleteRooms.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      // .addCase(addRooms.pending, (state) => {
      //   state.loading = true;
      //   state.status = "loading";
      // })
      // .addCase(addRooms.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.status = "success";
      //   state.rooms = action.payload;
      // })
      // .addCase(addRooms.rejected, (state) => {
      //   state.loading = false;
      //   state.status = "failed";
      // });
  },
});

// Action creators are generated for each case reducer function
export const { listRooms, addRoom, editRoom, deleteRoom } = roomsSlice.actions;

export const roomsList = (state) => state.rooms.rooms;
export default roomsSlice.reducer;
