import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export interface IUser {
    name:string;
    email:string;
    role:string;
    _id:string;
    createdAt:Date;
    updatedAt:Date;
    __v: number;
    error:string;
}




export interface APIResponse {
    user: IUser;
}

export interface IDataResponse {
    data: APIResponse;
}
export interface IDataResponse {
    data: { user:IUser };
}

export interface IErrorResponse {
    error2: FetchBaseQueryError | SerializedError;
}

// export type APIResponse = IDataResponse | IErrorResponse;