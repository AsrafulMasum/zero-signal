import { api } from '../api/baseApi';

const spotsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getSpots: builder.query({
            query: ({ page, limit, searchTerm }: { page?: number; limit?: number; searchTerm?: string }) => ({
                url: `/spot?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetSpotsQuery } = spotsSlice;
