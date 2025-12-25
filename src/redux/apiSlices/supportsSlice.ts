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
          url: `/support/reply/${payload?.id}`,
          method: "POST",
          body: payload?.replyMessage,
        };
      },
    }),
  }),
});

export const { useGetSupportMessagesQuery, useReplySupportMessagesMutation } =
  supportsApi;
