import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IUser} from "../../models/iUser";

interface RegisterUserPayload {
    name?: string | null;
    email?: string | null;
    password?: string| null;
    passwordConfirm?: string | null;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<IUser, RegisterUserPayload>({
            query: (body) => ({
                url: '/api/registration',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = authApi;
