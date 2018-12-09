import axios from 'axios';
import Vue from 'vue';
const vue = new Vue();
export interface Iparam {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: any;
}

// 格式化json => query 参数
function fnPureFormateObjToParamStr(paramObj: any) {
  const sdata = [] as any;
  Object.keys(paramObj).forEach((item) => {
    sdata.push(`${item}=${paramObj[item]}`);
  });
  return sdata.join('&');
}

export default function reqUtil(options: Iparam) {
  return new Promise((resolve, reject) => {
    const requestOptions: any = {
      method: options.method,
      url: options.url,
      headers: {
        token: localStorage.getItem('token'),
      },
    };
    if (!options.data) {
      options.data = {};
    }
    if (options.data.extUrl) {
      requestOptions.url += options.data.extUrl;
    }
    if (options.data.params) {
      requestOptions.url +=
        '?' + fnPureFormateObjToParamStr(options.data.params);
    }
    if (options.data.data) {
      requestOptions.data = options.data.data;
    }
    axios(requestOptions)
      .then((res) => {
        if (res.data.data.code === 200) {
          resolve(res.data.data.result);
        } else {
          vue.$message.warning(res.data.data.result.msg);
          reject(res.data.data.result);
        }
      })
      .catch((err) => {
        vue.$message.warning('服务器错误');
        reject(err);
      });
  });
}
