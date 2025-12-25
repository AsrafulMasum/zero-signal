import { api } from "../api/baseApi";

const rulesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getRules: builder.query({
      query: ({ type }) => {
        return {
          method: "GET",
          url: `/disclaimer?type=${type}`,
        };
      },
    }),

    updateRules: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/disclaimer",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetRulesQuery, useUpdateRulesMutation } = rulesSlice;