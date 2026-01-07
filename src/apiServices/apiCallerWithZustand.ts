import { apiCaller, ApiDataType } from './apiCaller';

interface ApiHandlerProps<T> {
  apiData: ApiDataType;
  apiFunc: (data: T) => void;
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
}

export const apiCallerWithZustand = async <T>({
  apiData,
  apiFunc,
  setLoading,
  setError,
}: ApiHandlerProps<T>): Promise<T | null> => {
  try {
    setLoading(true);
    setError(null);

    const res = await apiCaller(apiData);

    apiFunc(res);
    setLoading(false);

    return res.data;
  } catch (error: any) {
    setError(error.message || 'Something went wrong');
    setLoading(false);
    return null;
  }
};
