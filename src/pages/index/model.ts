/*
 * @Author: yanxiaodi
 * @Date: 2020-09-15 17:29:33
 * @Last Modified by: yanxiaodi
 * @Last Modified time: 2020-09-17 18:08:30
 */
import { showLoading, showToast, hideLoading } from '@tarojs/taro'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'
import isArray from 'lodash/isArray'

import * as dataServices from '../../services/delivery'

interface SetAsyncData {
  payload: {
    asyncData: any
  }
}
type InitState = {
  asyncData: any[]
}

const SET_ASYNC_DATA = 'SET_ASYNC_DATA'

const initState: InitState = {
  asyncData: [],
}

export default {
  namespace: 'index',
  state: initState,
  effects: {
    *fetch({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any[] = []
      try {
        const res = yield call(dataServices.getProjectPageList, payload)
        if (!!res && isArray(res.body)) {
          data = cloneDeep(res.body)
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
        yield put({
          type: SET_ASYNC_DATA,
          payload: {
            asyncData: data,
          },
        })
      }
      hideLoading()
    },
  },
  reducers: {
    SET_ASYNC_DATA(state: InitState, { payload }: SetAsyncData) {
      return assign({}, state, {
        asyncData: payload.asyncData,
      })
    },
  },
}
