import { api } from '../api/baseApi';

const activitySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllActivity: builder.query({
            query: ({ page, limit, searchTerm }: { page?: number; limit?: number; searchTerm?: string }) => {
                return {
                    url: `/activity?type=admin&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetAllActivityQuery } = activitySlice;
