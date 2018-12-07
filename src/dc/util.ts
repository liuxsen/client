import axios from 'axios';
import Vue from 'vue';
const vue = new Vue();
export interface Iparam {
  method: 'get' | 'post' | 'post' | 'delete';
  url: string;
  params?: any;
  data?: any;
}

// 格式化json => query 参数
function fnPureFormateObjToParamStr(paramObj: any) {
  const sdata = [];
  for (const attr of paramObj) {
    sdata.push(`${attr}=${paramObj[attr]}`);
  }
  return sdata.join('&');
}

export default function reqUtil(options: Iparam) {
  return new Promise((resolve, reject) => {
    const requestOptions: any = {
      method: options.method,
      url: options.url,
    };
    if (options.method === 'get') {
      requestOptions.url = requestOptions.url +=
        '?' + fnPureFormateObjToParamStr(options.params);
    } else {
      requestOptions.data = options.data;
    }
    axios(requestOptions)
      .then((res) => {
        if (res.data.data.result.code === 200) {
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
