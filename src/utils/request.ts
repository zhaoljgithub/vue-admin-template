import axios from "axios";
import type { AxiosRequestConfig } from 'axios';
import router from "../router/index";

import { message } from 'ant-design-vue';
import {
  getToken,
  clearLocalStorage
} from "@/utils/auth";

axios.defaults.timeout = 0;
axios.defaults.withCredentials=true


if (import.meta.env.MODE === "production") {
  axios.defaults.baseURL = 'api';
} else {
  axios.defaults.baseURL = 'api'
}

const instance = axios.create();
// request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token = getToken() as string
    (config as Record<string, any>).headers["loginToken"] = token
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code && res.code != 200) {
      // 迭代完成时如果有未完成的用户故事，则code返回-1
      if (res.code && res.code == "-1") {
        return response
      }
      message.error(res.msg || "调用接口失败！请联系运维人员！")

       Promise.reject(new Error(res.message || res.msg ||"Error"));
      return response
    } else {
      // 导出文件流时候，需要文件名称
      if (response.headers["content-disposition"]) {
        return response;
      }
      return response;
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          clearLocalStorage()
            router.replace({
              path: "/login"
            });
          break;
        case 403:
          message.error('暂无权限')
          break;
        case 500:
          if(error.response.data.message || error.response.data.msg){
            message.error(error.response.data.message || error.response.data.msg)
          }else{
            message.error("接口调用失败，服务端有异常!")
          }
          break;
        case 501:
            message.error("接口调用失败，服务端有异常!")
          break;
        case 502:
        case 503:

          message.error("网络异常")
          break;
      }
    }

    return Promise.reject(error);
  }
);
// export default axios

interface IResponseData<T = any> {
    code?: string
    msg?: string
    data?: T
}
export default async function request<T>(config: AxiosRequestConfig) {
    return instance
      .request<IResponseData<T>>(config)
      .then((res) => res.data);
  }
  
