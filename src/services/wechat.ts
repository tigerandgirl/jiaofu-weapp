/*
 * @Author: qiufh@bocspace.cn
 * @Date: 2021-08-10 23:41:11
 * @Last Modified by: qiufh
 * @Last Modified time: 2021-08-10 23:41:11
 */
import fetch from '../utils/request'
import Config from '../config'
import Schemas from '../utils/schema/wechat'

export async function autoLogin(params: {}) {
  return fetch.post(
    Config.wechat.autoLogin,
    { query: Schemas.wechat.autoLogin, variables: params },
    'autoLogin'
  )
}

export async function getPhoneNumber(params: {}) {
  return fetch.post(
    Config.wechat.getPhoneNumber,
    { query: Schemas.wechat.getPhoneNumber, variables: params },
    'getPhoneNumber'
  )
}

export async function codeLogin(params: {}) {
  return fetch.post(
    Config.wechat.codeLogin,
    { query: Schemas.wechat.codeLogin, variables: params },
    'codeLogin'
  )
}

export async function logout(params: {}) {
  return fetch.post(
    Config.wechat.logout,
    { query: Schemas.wechat.logout, variables: params },
    'logout'
  )
}
