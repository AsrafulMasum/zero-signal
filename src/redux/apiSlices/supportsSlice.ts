import { api } from "../api/baseApi";

const supportsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSupportMessages: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/support?limit=${limit}&page=${page}`,
          method: "GET",
        };
      },
    }),

    replySupportMessages: builder.mutation({
      query: (payload) => {
        return {
          url: `/support/${payload?.id}`,
          method: "PATCH",
          body: payload?.reply,
        };
      },
    }),
  }),
});

export const { useGetSupportMessagesQuery, useReplySupportMessagesMutation } =
  supportsApi;
