import { api } from "../api/baseApi";

const packageSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: () => ({
                url: "/verification-plan",
            }),
            providesTags: ["Package"],
        }),
        createPackage: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/verification-plan",
                body: data,
            }),
            invalidatesTags: ["Package"],
        }),

        editPackage: builder.mutation({
            query: ({ id, data }) => ({
                method: "PATCH",
                url: `/verification-plan/${id}`,
                body: data,
            }),
            invalidatesTags: ["Package"],
        }),

        deletePackage: builder.mutation({
            query: ({ id }) => ({
                method: "DELETE",
                url: `/verification-plan/${id}`,
            }),
            invalidatesTags: ["Package"],
        }),
    }),
});

export const { useGetPackagesQuery, useCreatePackageMutation, useEditPackageMutation, useDeletePackageMutation } = packageSlice;