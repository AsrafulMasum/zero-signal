import { api } from "../api/baseApi";

const facilitySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getFacilities: builder.query({
      query: ({ query }: { query?: string }) => ({
        url: "/facilitiy?" + query,
      }),
      providesTags: ["Facility"], // cache কে tag দিচ্ছি
    }),

    createFacility: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/facilitiy",
        body: data,
      }),
      invalidatesTags: ["Facility"], 
    }),

    deleteFacility: builder.mutation({
      query: ({ _id }: { _id: string }) => ({
        method: "DELETE",
        url: `/facilitiy/${_id}`,
        
      }),
      invalidatesTags: ["Facility"], 
    }),
  }),
});

export const {
  useCreateFacilityMutation,
  useGetFacilitiesQuery,
  useDeleteFacilityMutation,
} = facilitySlice;
