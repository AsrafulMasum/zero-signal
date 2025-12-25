import { api } from "../api/baseApi";

const reportsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllReports: builder.query({
            query: ({ page, limit }: { page?: number; limit?: number }) => {
                return {
                    url: `/report?page=${page}&limit=${limit}`,
                    method: 'GET',
                };
            },
        })
    }),
});

export const { useGetAllReportsQuery } = reportsSlice;