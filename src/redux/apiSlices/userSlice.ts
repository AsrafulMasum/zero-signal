import { api } from '../api/baseApi';

const userSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page, limit, searchTerm }: { page?: number; limit?: number; searchTerm?: string }) => {
                return {
                    url: `/user?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
                    method: 'GET',
                };
            },
        }),

        changeStatusUser: builder.mutation({
            query: ({ id }: { id: string }) => {
                return {
                    method: 'PATCH',
                    url: `/user/${id}`,
                };
            },
        }),
    }),
});
export const { useGetUsersQuery, useChangeStatusUserMutation } = userSlice;
