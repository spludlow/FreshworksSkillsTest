import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobSkillsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.dataatwork.org/v1/",
  }),
  endpoints(builder) {
    return {
      // search jobs autocomplete
      searchJobs: builder.query({
        query(contains) {
          return `/jobs/autocomplete?contains=${contains}`;
        },
      }),
      // search skills autocomplete
      searchSkills: builder.query({
        query(contains) {
          return `/skills/autocomplete?contains=${contains}`;
        },
      }),
      // search skills by job
      getSkillsForJob: builder.query({
        query(jobId) {
          return `/jobs/${jobId}/related_skills`;
        },
      }),
      // search jobs by skill
      getJobsForSkill: builder.query({
        query(skillId) {
          return `/skills/${skillId}/related_jobs`;
        },
      }),
    };
  },
});

export const {
  useSearchJobsQuery,
  useSearchSkillsQuery,
  useGetJobsForSkillQuery,
  useGetSkillsForJobQuery,
} = jobSkillsApi;
