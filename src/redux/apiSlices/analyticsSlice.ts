import { api } from '../api/baseApi';

const analyticsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnalytics: builder.query({
            query: () => {
                return {
                    url: `/analytics/summary`,
                    method: 'GET',
                };
            },
        }),

        getUserAnalytics: builder.query({
            query: ({ year }: { year?: string }) => {
                return {
                    url: `/analytics/user-statistics?year=${year}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetAnalyticsQuery, useGetUserAnalyticsQuery } = analyticsSlice;
