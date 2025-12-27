import { api } from '../api/baseApi';

const reportsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllReports: builder.query({
            query: ({ page, limit, searchTerm }: { page?: number; limit?: number; searchTerm?: string }) => {
                console.log(searchTerm);
                return {
                    url: `/report?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetAllReportsQuery } = reportsSlice;
