import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://72.167.224.54:5012/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token && token !== 'undefined') {
                headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['notifications'],
});

export const imageUrl = 'http://72.167.224.54:5012';
