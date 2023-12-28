import { useEffect, useState } from 'react';
// @ts-ignore
import XHRInterceptor from 'react-native/Libraries/Network/XHRInterceptor';

const useRequests = () => {
  const [requests, setRequests] = useState<ApiRequest[]>([]);

  function enableXHRInterception(): void {
    function saveRequest(xhr: any, success: boolean) {
      const url = xhr._url;
      const paramsObj = xhr._params;

      setRequests((prev) => [
        {
          id: prev.length + 1,
          method: xhr._method,
          url: url,
          full_url: url,
          success,
          data_cells: [
            {
              label: 'Response',
              key: 'response',
              data: xhr._response,
            },
            {
              label: 'Request Headers',
              key: 'request_headers',
              data: xhr._requestHeaders,
            },
            {
              label: 'Request Body',
              key: 'request_body',
              data: xhr._requestData,
            },
            {
              label: 'Response Headers',
              key: 'response_headers',
              data: xhr._responseHeaders,
              type: 'string',
            },
            {
              label: 'Request Params',
              key: 'request_params',
              data: paramsObj,
            },
          ].filter(
            ({ data }) =>
              data !== undefined &&
              data !== null &&
              data !== '' &&
              data !== '{}' &&
              data !== '[]'
          ),
          heading_cells: {
            'Status Code': xhr._status,
            'Method': xhr._method,
            'Duration': `${new Date().getTime() - xhr._startTime}ms`,
          },
          response: xhr._response,
        },
        ...prev,
      ]);
    }
    if (XHRInterceptor.isInterceptorEnabled()) {
      return;
    }

    XHRInterceptor.setOpenCallback((method: any, url: any, xhr: any) => {
      xhr._startTime = new Date().getTime();
      xhr._method = method;
      xhr._url = url;
      xhr._params = xhr._urlParams;
    });

    XHRInterceptor.setRequestHeaderCallback(
      (header: any, value: any, xhr: any) => {
        try {
          xhr._requestHeaders = xhr._requestHeaders;
          xhr._requestHeaders[header] = value;
        } catch (e) {
          xhr._requestHeaders = { [header]: value };
        }
      }
    );

    XHRInterceptor.setSendCallback((data: any, xhr: any) => {
      try {
        xhr._requestData = JSON.parse(data);
      } catch (e) {
        xhr._requestData = data;
      }
    });

    XHRInterceptor.setHeaderReceivedCallback(
      (_type: any, _size: any, responseHeaders: any, xhr: any) => {
        xhr._responseHeaders = responseHeaders;
      }
    );

    XHRInterceptor.setResponseCallback(
      (
        status: any,
        _timeout: any,
        response: any,
        _responseURL: any,
        _responseType: any,
        xhr: any
      ) => {
        xhr._status = status;
        try {
          // xhr._response = response;
          xhr._response = JSON.parse(response);
          saveRequest(xhr, status.toString().startsWith('2'));
        } catch (e) {
          // console.log(e);
        }
      }
    );
    XHRInterceptor.enableInterception();
  }

  useEffect(() => {
    enableXHRInterception();
  }, []);

  return requests;
};

export default useRequests;
