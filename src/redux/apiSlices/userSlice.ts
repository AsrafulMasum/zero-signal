import { api } from '../api/baseApi';

const userSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page, limit }: { page?: number, limit?: number }) => {
                return {
                    url: `/user?page=${page}&limit=${limit}`,
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
