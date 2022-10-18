import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsonData from "../../json/jsonData";
import delay from "../delayFunction"

// const initialState = jsonData;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await delay(jsonData);
});
export const unfetchUsers = createAsyncThunk("users/unfetchUsers", async () => {
  console.log("unfetched");
  return await delay([]);
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: null,
    loading: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, avatar, first_name, last_name, email, status, gender, phone } = action.payload;
      const foundUser = state.find((user) => user.id === id);
      if (foundUser) {
        foundUser.avatar = avatar;
        foundUser.first_name = first_name;
        foundUser.last_name = last_name;
        foundUser.email = email;
        foundUser.status = status;
        foundUser.gender = gender;
        foundUser.phone = phone;

        // id: 1,
        // Avatar: "https://robohash.org/impeditprovidenteveniet.png?size=50x50&set=set1",
        // first_name: "Lenora",
        // last_name: "Antonsen",
        // date_start: "05/03/2022",
        // time_start: "19:46",
        // date_end: "10/26/2021",
        // time_end: "9:26",
        // notes: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
        // special_request: "repurpose integrated niches",
        // rooom_id: 1,
        // email: "lantonsen0@reverbnation.com",
        // status: true,
        // gender: "Female",
        // phone: "+58 (242) 578-3654",
        // price: "120",
      }
    },
    deleteUser: (state, action) => {
      const foundUser = state.find((user) => user.id === action.payload);
      if (foundUser) {
        state.splice(state.indexOf(foundUser), 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
        state.users = [];
      })
      .addCase(unfetchUsers.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(unfetchUsers.fulfilled, (state, action) => {
        state.loading = null;
        state.status = null;
        state.users = action.payload;
      })
      .addCase(unfetchUsers.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
        state.users = [];
      });
  },
});

// Action creators are generated for each case reducer function
export const { addUser, editUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
