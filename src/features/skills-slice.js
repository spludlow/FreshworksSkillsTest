import { createSlice } from "@reduxjs/toolkit";

export const skillSlice = createSlice({
  name: "skill",
  initialState: {
    value: "",
    contains: "",
  },
  reducers: {
    setSkillValue: (state, action) => {
      state.value = action.payload;
    },
    setContainsValue: (state, action) => {
      state.contains = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSkillValue, setContainsValue } = skillSlice.actions;

export default skillSlice.reducer;
