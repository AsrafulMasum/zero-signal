import { api } from '../api/baseApi';

const categoriesSlice = api.injectEndpoints({
    endpoints: (builders) => ({
        getSubCategories: builders.query({
            query: () => ({
                url: '/category/sub-category',
                method: 'GET',
            }),
        }),

        addSubCategory: builders.mutation({
            query: (data) => {
                return {
                    url: '/category/sub-category',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        updateSubCategory: builders.mutation({
            query: (data) => {
                return {
                    url: `/category/sub-category/${data?.id}`,
                    method: 'PATCH',
                    body: data?.data,
                };
            },
        }),

        deleteSubCategory: builders.mutation({
            query: (id) => {
                return {
                    url: `/category/sub-category/${id}`,
                    method: 'DELETE',
                };
            },
        }),

        getCategories: builders.query({
            query: () => ({
                url: `/category?withSub=true`,
                method: 'GET',
            }),
        }),

        addCategory: builders.mutation({
            query: (data) => {
                return {
                    url: '/category',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        deleteCategory: builders.mutation({
            query: (id) => {
                return {
                    url: `/category/${id}`,
                    method: 'DELETE',
                };
            },
        }),

        updateCategory: builders.mutation({
            query: (data) => {
                return {
                    url: `/category/${data?.id}`,
                    method: 'PATCH',
                    body: data?.name,
                };
            },
        }),

        getRouteTypes: builders.query({
            query: () => ({
                url: `/category/route-type`,
                method: 'GET',
            }),
        }),

        addRouteType: builders.mutation({
            query: (data) => {
                return {
                    url: '/category/route-type',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        deleteRouteType: builders.mutation({
            query: (id) => {
                return {
                    url: `/category/route-type/${id}`,
                    method: 'DELETE',
                };
            },
        }),

        updateRouteType: builders.mutation({
            query: (data) => {
                return {
                    url: `/category/route-type/${data?.id}`,
                    method: 'PATCH',
                    body: data?.payload,
                };
            },
        }),
    }),
});

export const {
    useGetSubCategoriesQuery,
    useAddSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation,
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useGetRouteTypesQuery,
    useAddRouteTypeMutation,
    useDeleteRouteTypeMutation,
    useUpdateRouteTypeMutation,
} = categoriesSlice;
