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
} = categoriesSlice;
