/*
 * @Author: yanxiaodi
 * @Date: 2020-09-15 23:41:50
 * @Last Modified by: yanxiaodi
 * @Last Modified time: 2020-09-17 02:00:48
 */
import { getStorageSync, addInterceptor, request } from '@tarojs/taro'

import interceptors from './interceptors'
import getBaseUrl from './baseUrl'

interceptors.forEach(i => addInterceptor(i))

type Params = {
  method:
    | 'GET'
    | 'OPTIONS'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
    | undefined
}

class fetch {
  baseOptions(params, method: Params['method'] = 'GET', type) {
    let { url, data } = params
    const BASE_URL = getBaseUrl(url)
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option = {
      url: `${BASE_URL}${url}`,
      data,
      method,
      type: type,
      header: {
        'content-type': contentType,
        Authorization: getStorageSync('Authorization'),
      },
    }
    return request(option)
  }

  post(url: string, data: any, type: string) {
    let params = { url, data }
    return this.baseOptions(params, 'POST', type)
  }
}

export default new fetch()
