import baseApi from '../baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),

        checkAuth: builder.query({
            query: () => '/auth/checkauth',
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useCheckAuthQuery, useLogoutMutation } = authApi;
