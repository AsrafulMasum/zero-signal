import { api } from "../api/baseApi";

const reviewSlice =api.injectEndpoints({
    endpoints: (builder) => ({
        getAllReviews: builder.query({
            query: () => `/review/admin`,
            providesTags: ["Review"],
        }),
        updateReview: builder.mutation({
            query: (data) => ({
                url: `/review/status/${data.id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Review"],
        }),
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/review/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Review"],
        }),
    }),
});
export const { useGetAllReviewsQuery, useUpdateReviewMutation, useDeleteReviewMutation } = reviewSlice;