
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shariful5000.binarybards.online/api/v1',
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

export const imageUrl = 'https://shariful5000.binarybards.online';
