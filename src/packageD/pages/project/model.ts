/*
 * @Author: yanxiaodi
 * @Date: 2020-09-15 17:29:33
 * @Last Modified by: yanxiaodi
 * @Last Modified time: 2020-09-17 18:08:30
 */
import { showLoading, showToast, hideLoading } from '@tarojs/taro'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'

import * as dataServices from '../../../services/delivery'

interface SetAsyncData {
  payload: {
    projectDetail: any
  }
}
type InitState = {
  projectDetail: any
}

const initState: InitState = {
  projectDetail: null,
}

export default {
  namespace: 'project',
  state: initState,
  effects: {
    *getProjectDetail({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.getProjectDetail, payload)
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
        yield put({
          type: 'updateState',
          payload: {
            projectDetail: data,
          },
        })
        return new Promise(resolve => {
          resolve(data)
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
    updateState(state: InitState, { payload }: SetAsyncData) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
