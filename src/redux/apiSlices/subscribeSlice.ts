import { api } from "../api/baseApi";

const subscribeSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscribes: builder.query({
            query: (query) => `/subscribe?${query}`,
        })
    }),
});

export const { useGetAllSubscribesQuery } = subscribeSlice;