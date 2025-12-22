import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


 
const token  = localStorage.getItem("token");

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://92.205.234.176:5007/api/v1",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    }),
    tagTypes: ["Facility","Package","Review"],
    endpoints: () => ({})
});

// export const imageUrl = "http://206.189.231.81:5000";
// export const imageUrl = "http://10.10.7.72:5000";
export const imageUrl = "http://92.205.234.176:5007";

