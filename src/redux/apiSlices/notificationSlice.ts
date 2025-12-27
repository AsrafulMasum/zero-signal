import { api } from '../api/baseApi';

const notificationSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: () => ({
                url: `/notification`,
            }),
        }),

        changeStatusNotification: builder.mutation({
            query: ({ id }: { id: string }) => ({
                method: 'PATCH',
                url: `/notificaiton/${id}/seen`,
            }),
        }),

        readAllNotification: builder.mutation({
            query: () => ({
                method: 'PATCH',
                url: `/notification`,
            }),
        }),
    }),
});

export const { useGetNotificationQuery, useChangeStatusNotificationMutation, useReadAllNotificationMutation } =
    notificationSlice;
