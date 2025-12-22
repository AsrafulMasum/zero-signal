import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


 
const token  = localStorage.getItem("token");

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://shariful5000.binarybards.online/api/v1",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    }),
    tagTypes: ["Facility","Package","Review"],
    endpoints: () => ({})
});

export const imageUrl = "https://shariful5000.binarybards.online";
