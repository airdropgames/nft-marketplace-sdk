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
    post: <T = any>({ data, header, endpoint, q, }: {
        data: T;
        header: any;
        endpoint: string;
        q: string;
    }) => Promise<T>;
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
    patch: <T = any>({ header, data, endpoint, }: {
        header?: {
            headers: {
                "Content-Type": string;
                Authorization: string;
            };
        } | undefined;
        data?: null | undefined;
        endpoint?: string | undefined;
    }) => Promise<T>;
}
export default BaseApi;
