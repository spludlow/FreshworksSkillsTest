import { createSlice } from "@reduxjs/toolkit";

export const selectedSkillSlice = createSlice({
  name: "selectedSkill",
  initialState: {
    skill: null,
  },
  reducers: {
    setSelectedSkill: (state, action) => {
      state.skill = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedSkill } = selectedSkillSlice.actions;

export default selectedSkillSlice.reducer;
