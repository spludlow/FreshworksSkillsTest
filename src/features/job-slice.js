import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    value: "",
    contains: "",
  },
  reducers: {
    setJobValue: (state, action) => {
      state.value = action.payload;
    },
    setContainsValue: (state, action) => {
      state.contains = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setJobValue, setContainsValue } = jobSlice.actions;

export default jobSlice.reducer;
