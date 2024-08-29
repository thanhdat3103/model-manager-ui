import { BASE_URL } from '@/config/app';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LogoutUser, TokenReceived } from './auth/authActionCreators';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        const userId = getState().auth.user?.id;

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
            headers.set('x-client-id', userId);
        }

        return headers;
    },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401 && result.error.data?.status === 440011) {
        // get refresh token from store
        const refreshToken = api.getState().auth.refreshToken;

        // try to get a new token
        const refreshResult = await baseQuery(
            { url: '/auth/handle-refresh-token', headers: { 'x-refresh-token': refreshToken } },
            api,
            extraOptions,
        );
        if (refreshResult.data) {
            // store the new token
            api.dispatch(TokenReceived(refreshResult.data.data));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(LogoutUser());
        }
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({}),
});

export default baseApi;
