import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { API_BASE_URL } from "./apiEndPoints";

export const apiCaller = <T>(config: ApiDataType<T>): Promise<any> => {
  return new Promise((resolve, reject) => {
    callApi(config, resolve, reject);
  });
};

export interface ApiDataType<T = any> {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
  url: string;
  useFormData?: boolean;
  payload?: T;
  sendToken?: boolean;
  customHeader?: Record<string, any>;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const callApi = async <T>(
  { method, url, payload, useFormData, customHeader }: ApiDataType<T>,
  resolve: (value?: any) => void,
  reject: (reason?: any) => void
): Promise<void> => {
  const headers: AxiosRequestConfig["headers"] = {
    ...customHeader,
    Accept: "application/json",
  };

  const axiosData: AxiosRequestConfig = {
    method,
    headers,
    url,
  };

  if (method !== "GET" && method !== "DELETE" && payload) {
    if (useFormData) {
      headers["Content-Type"] = "multipart/form-data";
      axiosData.data = getFormData(payload);
    } else {
      headers["Content-Type"] = "application/json";
      axiosData.data = JSON.stringify(payload);
    }
  }

  try {
    const response: AxiosResponse = await axiosInstance(axiosData);
    checkResponse(response, resolve, reject);
  } catch (err: any) {
    const response = err?.response;
    if (response) {
      checkResponse(response, resolve, reject);
    } else {
      reject(err.message ? { error: err.message } : { error: err.message });
    }
  }
};

export const checkResponse = (
  response: AxiosResponse,
  resolve: (value?: any) => void,
  reject: (reason?: any) => void
): void => {
  switch (response.status) {
    case 200:
    case 201:
    case 204:
      resolve(response.data || {});
      break;
    case 400:
      reject(response.data);
      break;
    case 401:
      reject(response.data);
      localStorage.clear();
      window.location.href = "/login";
      break;
    case 500:
      reject({ err: response.data?.message || "Internal Server Error" });
      break;
    default:
      reject({ err: response.data?.message || "Unexpected error occurred" });
  }
};

export const getFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};
