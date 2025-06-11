import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

//Async thunk function boilerplate code
// export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
//   return res.data;
// });

//login thunk
export const loginUser = createAsyncThunk("user/login", async ({ email, password }, thunkAPI) => {
  //3 arguments for CAT (action type, async (), thunkAPI)
  try {

    const res = await axios.post("sampleURL", { email, password });

    //store the incoming token
    localStorage.setItem("token", res.data.token);

    return res.data;

  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data.message);
  }
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.userData = null;
      localStorage.removeItem("token");
    }

  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;

    }).addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;

    }).addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message
    })
  }
})

export default userSlice.reducer;