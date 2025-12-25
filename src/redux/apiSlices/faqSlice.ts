import { api } from "../api/baseApi";

const faqSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getFAQ: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/faq",
        };
      },
    }),

    createFAQ: builder.mutation({
      query: (faq) => ({
        method: "POST",
        url: "/faq",
        body: faq,
      }),
    }),

    updateFAQ: builder.mutation({
      query: ({ id, faq }) => ({
        method: "PATCH",
        url: `/faq/${id}`,
        body: faq,
      }),
    }),

    deleteFAQ: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/faq/${id}`,
      }),
    }),
  }),
});

export const {
  useGetFAQQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqSlice;