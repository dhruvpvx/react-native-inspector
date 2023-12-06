import { useEffect, useState } from 'react';

const useRequests = (axios: any) => {
  const [requests, setRequests] = useState<ApiRequest[]>([]);

  useEffect(() => {
    if (axios) {
      axios.interceptors.request.use((request: any) => {
        request.startTime = new Date().getTime();
        return request;
      });
      const saveRequest = (response: any, success: boolean) => {
        const [url, params] = response.config.url?.split('?') || [];
        const paramsObj = (params as string)?.split('&').reduce(
          (acc, curr) => {
            const [key, value] = curr.split('=');
            return {
              ...acc,
              [key as string]: value,
            };
          },
          {
            ...response.config.params,
          }
        );

        setRequests((prev) => [
          {
            id: prev.length + 1,
            method: response.config.method,
            url: url,
            full_url: (response.config.baseURL || '') + url,
            success,
            data_cells: [
              {
                label: 'Response',
                key: 'response',
                data: response.data,
              },
              {
                label: 'Request Headers',
                key: 'request_headers',
                data: response.config.headers,
              },
              {
                label: 'Request Body',
                key: 'request_body',
                data: response.config.data
                  ? JSON.parse(response.config.data)
                  : undefined,
              },
              {
                label: 'Response Headers',
                key: 'response_headers',
                data: response.headers,
              },
              {
                label: 'Request Params',
                key: 'request_params',
                data: paramsObj,
              },
            ].filter(({ data }) => data !== undefined && data !== null),
            heading_cells: {
              'Status Code': response.status,
              'Method': response.config.method?.toUpperCase(),
              'Duration': `${
                new Date().getTime() - response.config.startTime
              }ms`,
            },
            response,
          },
          ...prev,
        ]);
      };
      axios.interceptors.response.use(
        (response: any) => {
          saveRequest(response, true);
          return response;
        },
        (response: any) => {
          saveRequest(JSON.parse(JSON.stringify(response)), false);
          return Promise.reject(response);
        }
      );
    }
  }, [axios]);

  return requests;
};

export default useRequests;
