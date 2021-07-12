import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { jobSkillsApi } from "../features/jobSkills/job-skills-api-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [jobSkillsApi.reducerPath]: jobSkillsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(jobSkillsApi.middleware);
  },
});
