import * as headers from './headers.services';
declare class BaseApi {
    axios: import("axios").AxiosStatic;
    baseUrl: string;
    endpoints: Record<string, string>;
    headers: typeof headers;
    constructor({ baseUrl, endpoints, }: {
        baseUrl: string;
        endpoints: Record<string, string>;
    });
    post: <T = any, U = any>({ data, header, endpoint, q, }: {
        endpoint: string;
        data: T;
        header?: any;
        q?: string | undefined;
    }) => Promise<U>;
    get: <T = any>({ q, header, endpoint, params, }: {
        q?: string | undefined;
        header?: {
            headers: {
                "Content-Type": string;
            };
        } | undefined;
        endpoint?: string | undefined;
        params?: {} | undefined;
    }) => Promise<T>;
    delete: <T = any>({ header, endpoint }: {
        header?: {
            headers: {
                "Content-Type": string;
                Authorization: string;
            };
        } | undefined;
        endpoint?: string | undefined;
    }) => Promise<T>;
    put: <T = any>({ header, data, endpoint, }: {
        header?: {
            headers: {
                "Content-Type": string;
                Authorization: string;
            };
        } | undefined;
        data?: null | undefined;
        endpoint?: string | undefined;
    }) => Promise<T>;
    patch: <T = any, U = any>({ header, data, endpoint, }: {
        endpoint: string;
        data: T | undefined;
        header?: any;
    }) => Promise<U>;
}
export default BaseApi;
