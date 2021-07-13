import { createSlice } from "@reduxjs/toolkit";

export const selectedJobSlice = createSlice({
  name: "selectedJob",
  initialState: {
    job: null,
  },
  reducers: {
    setSelectedJob: (state, action) => {
      state.job = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedJob } = selectedJobSlice.actions;

export default selectedJobSlice.reducer;
