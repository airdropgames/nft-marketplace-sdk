import * as headers from './headers.services';
import axios from 'axios';

// this will be useful for api services
class BaseApi {
  axios;
  baseUrl;
  endpoints;
  headers;

  constructor({ baseUrl, endpoints }: { baseUrl: string; endpoints: Record<string, string> }) {
    this.axios = axios;
    this.baseUrl = baseUrl;
    this.endpoints = endpoints;
    this.headers = headers;
  }

  post = async <T = any, U = any>({
    data,
    header = this.headers.HeaderAuth(),
    endpoint,
    q = '',
  }: {
    endpoint: string;
    data: T;
    header?: any;
    q?: string;
  }): Promise<U> => {
    try {
      const res = await this.axios.post<U>(`${this.baseUrl}${endpoint}${q ? `?${q}` : ``}`, data, header);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };

  get = async <T = any>({ q = '', header = this.headers.Header(), endpoint = '', params = {} }): Promise<T> => {
    try {
      const res = await this.axios.get<T>(`${this.baseUrl}${endpoint}${q ? `?${q}` : ``}`, {
        ...header,
        params,
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };

  delete = async <T = any>({ header = this.headers.HeaderAuth(), endpoint = '' }): Promise<T> => {
    try {
      const res = await this.axios.delete<T>(`${this.baseUrl}${endpoint}`, header);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };

  put = async <T = any>({ header = this.headers.HeaderAuth(), data = null, endpoint = '' }): Promise<T> => {
    try {
      const res = await this.axios.put<T>(`${this.baseUrl}${endpoint}`, data, header);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };

  patch = async <T = any, U = any>({
    header = this.headers.HeaderAuth(),
    data,
    endpoint = '',
  }: {
    endpoint: string;
    data: T | undefined;
    header?: any;
  }): Promise<U> => {
    try {
      const res = await this.axios.patch<U>(`${this.baseUrl}${endpoint}`, data, header);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };
}

export default BaseApi;
