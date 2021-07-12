import { configureStore } from "@reduxjs/toolkit";
import { jobSkillsApi } from "../features/jobSkills/job-skills-api-slice";

export const store = configureStore({
  reducer: {
    [jobSkillsApi.reducerPath]: jobSkillsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(jobSkillsApi.middleware);
  },
});
