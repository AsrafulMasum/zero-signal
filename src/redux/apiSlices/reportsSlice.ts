import { api } from "../api/baseApi";

const reportsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllReports: builder.query({
            query: () => {
                return {
                    url: `/report`,
                    method: 'GET',
                };
            },
        })
    }),
});

export const { useGetAllReportsQuery } = reportsSlice;