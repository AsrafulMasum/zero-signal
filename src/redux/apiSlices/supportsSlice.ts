import { api } from '../api/baseApi';

const supportsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSupportMessages: builder.query({
            query: ({ page, limit, searchTerm }) => {
                return {
                    url: `/support?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
                    method: 'GET',
                };
            },
        }),

        replySupportMessages: builder.mutation({
            query: (payload) => {
                return {
                    url: `/support/${payload?.id}`,
                    method: 'PATCH',
                    body: payload?.reply,
                };
            },
        }),
    }),
});

export const { useGetSupportMessagesQuery, useReplySupportMessagesMutation } = supportsApi;
