import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import axios, { AxiosInstance } from 'axios';
import { setTokens, clearTokens } from '../slices/authSlice';
import {RootState} from "../reducers/rootReducer";

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

const apiMiddleware: Middleware<{}, RootState> = (store: MiddlewareAPI<Dispatch, RootState>) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {
    console.log('act',action.type);
    if (action.type === 'authSlice/setTokens') {
        // Сохранение токенов в localStorage или в cookie
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
    }

    if (action.type === 'authSlice/clearTokens') {
        // Очистка токенов из localStorage или из cookie
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    // Добавление токена доступа к заголовку запроса
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }

    try {
        const result = await next(action);
        console.log('result',result);


        // Обработка истечения срока действия токена доступа
        if (result.error && result.error.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                // Выполнение запроса на обновление токена доступа
                try {
                    const response = await api.post('/refresh-token', { refreshToken });
                    const newAccessToken: string = response.data.accessToken;

                    // Сохранение нового токена доступа
                    store.dispatch(setTokens({ accessToken: newAccessToken, refreshToken }));
                } catch (refreshError) {
                    // Обработка ошибки обновления токена доступа
                    return Promise.reject(refreshError);
                }
            } else {
                // Очистка токенов и перенаправление на страницу входа
                store.dispatch(clearTokens());
                // Редирект на страницу входа или обработка иным способом
            }
        }

        // if(result.error &&result.payload.status===400 ){
        //      Promise.reject(result.payload.data);
        // }

        return result;
    } catch (error) {
        console.log('1231232');
        
        return error;
    }
};

export default apiMiddleware;
