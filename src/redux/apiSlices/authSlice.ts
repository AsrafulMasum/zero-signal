import { api } from '../api/baseApi';

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        otpVerify: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/auth/verify-email',
                    body: data,
                };
            },
        }),

        login: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/auth/login',
                    body: data,
                };
            },
        }),

        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/auth/forget-password',
                    body: data,
                };
            },
        }),

        resetPassword: builder.mutation({
            query: (value) => {
                return {
                    url: '/auth/reset-password',
                    headers: { authorization: value?.token },
                    method: 'POST',
                    body: value?.payload,
                };
            },
        }),

        changePassword: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/auth/change-password',
                    body: data,
                };
            },
        }),

        updateProfile: builder.mutation({
            query: (data) => {
                return {
                    method: 'PATCH',
                    url: '/user/profile',
                    body: data,
                };
            },
        }),

        resendOTP: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/auth/forget-password',
                    body: data,
                };
            },
        }),

        profile: builder.query({
            query: () => {
                return {
                    url: '/user/profile',
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useOtpVerifyMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useResendOTPMutation,
    useProfileQuery,
} = authSlice;
