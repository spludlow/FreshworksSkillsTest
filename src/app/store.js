import { configureStore } from "@reduxjs/toolkit";
import { jobSkillsApi } from "../features/job-skills-api-slice";
import jobReducer from "../features/job-slice";
import skillReducer from "../features/skills-slice";
import selectedJobReducer from "../features/selected-job-slice";
import selectedSkillReducer from "../features/selected-skill-slice";

export const store = configureStore({
  reducer: {
    [jobSkillsApi.reducerPath]: jobSkillsApi.reducer,
    job: jobReducer,
    skill: skillReducer,
    selectedJob: selectedJobReducer,
    selectedSkill: selectedSkillReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(jobSkillsApi.middleware);
  },
});
