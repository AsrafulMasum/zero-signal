import { api } from "../api/baseApi";

const analatysSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnalatys: builder.query({
            query: ({year}:{year?:string}) => {
                return {
                    url: `/analytics/${year??new Date().getFullYear()}`,
                    method: "GET",
                }
            },
        }),
        getHostAnalatycs: builder.query({
            query: ({id,year}:{year?:string,id:string}) => {
               
                
                return {
                    url: `/analytics/host/${year??new Date().getFullYear()}/${id}`,
                    method: "GET",
                }
            },
        }),
    }),
});

export const { useGetAnalatysQuery, useGetHostAnalatycsQuery } = analatysSlice;