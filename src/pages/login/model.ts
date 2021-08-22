/*
 * @Author: qiufh
 * @Date: 2021-08-18 18:18:18
 * @Last Modified by: qiufh
 * @Last Modified time: 2021-08-18 18:18:18
 */
import { showLoading, showToast, hideLoading } from '@tarojs/taro'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'

import * as dataServices from '../../services/wechat'

interface SetAsyncData {
  payload: {
    asyncData: any
    identifier: any // 用户名
    code: any // 验证码
    openId: any // 微信用户唯一标识
    sessionKey: any
    header: any // 请求头
  }
}
type InitState = {
  asyncData: any[]
  identifier: any // 用户名
  code: any // 验证码
  openId: any // 微信用户唯一标识
  sessionKey: any
  header: any // 请求头
}

const initState: InitState = {
  asyncData: [],
  identifier: null, // 用户名
  code: null, // 验证码
  openId: '', // 微信用户唯一标识
  sessionKey: '',
  header: { 'Content-Type': 'application/json', Cookie: '' }, // 请求头
}

export default {
  namespace: 'login',
  state: initState,
  effects: {
    *autoLogin({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.autoLogin, payload)
        if (!!res) {
          data = cloneDeep(res)
        }
        showToast({
          title: '请求成功',
          icon: 'success',
          duration: 1500,
        })
      } catch (e) {
        showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1500,
        })
      } finally {
        hideLoading()
        return new Promise(resolve => {
          resolve(data)
        })
      }
    },
    *getPhoneNumber({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.getPhoneNumber, payload)
        if (!!res) {
          data = cloneDeep(res)
        }
        showToast({
          title: '请求成功',
          icon: 'success',
          duration: 1500,
        })
      } catch (e) {
        showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1500,
        })
      } finally {
        hideLoading()
        return new Promise(resolve => {
          resolve(data)
        })
      }
    },
    *codeLogin({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.codeLogin, payload)
        if (!!res) {
          data = cloneDeep(res)
        }
        showToast({
          title: '请求成功',
          icon: 'success',
          duration: 1500,
        })
      } catch (e) {
        showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1500,
        })
      } finally {
        hideLoading()
        return new Promise(resolve => {
          resolve(data)
        })
      }
    },
    *logout({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.logout, payload)
        if (!!res) {
          data = cloneDeep(res)
        }
        showToast({
          title: '请求成功',
          icon: 'success',
          duration: 1500,
        })
      } catch (e) {
        showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1500,
        })
      } finally {
        hideLoading()
        return new Promise(resolve => {
          resolve(data)
        })
      }
    },
  },
  reducers: {
    SET_ASYNC_DATA(state: InitState, { payload }: SetAsyncData) {
      return assign({}, state, {
        asyncData: payload.asyncData,
      })
    },
    updateState(state: InitState, { payload }: SetAsyncData) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
