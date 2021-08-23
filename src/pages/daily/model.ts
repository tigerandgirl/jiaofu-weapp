import { showLoading, showToast, hideLoading } from '@tarojs/taro'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'
import isArray from 'lodash/isArray'

import * as dataServices from '../../services/delivery'

interface SetAsyncData {
  payload: {
    asyncData: any
    dailyList: any[]
    dailyDetail: any
    projectDetail: any
  }
}
type InitState = {
  asyncData: any[]
  dailyList: any[]
  dailyDetail: any
  projectDetail: any
}

const SET_ASYNC_DATA = 'SET_ASYNC_DATA'

const initState: InitState = {
  asyncData: [],
  dailyList: [],
  dailyDetail: {
    id: null,
    date: null,
    title: null,
    progressState: null,
    weather: null,
    windPower: null,
    overallDescription: null,
    contentRemarks: null,
    workersCount: null,
    material: null,
    summary: null,
    tomorrowPlanRemarks: null,
    tomorrowWeather: null,
    tomorrowWindPower: null,
    tomorrowMaterial: null,
    assistance: null,
    saveType: null,
    createTime: 0,
    likeCount: 0,
    commentCount: 0,
    readCount: 0,
    contents: [],
    tomorrowContents: [],
    projectId: null,
    comments: [],
    likeUsers: [],
    dailyDocuments: [],
    createUser: null,
    createUserName: null,
  },
  projectDetail: null,
}

export default {
  namespace: 'daily',
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
      }
      hideLoading()
    },
    *getDailyListPage({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any[] = []
      try {
        const res = yield call(dataServices.getDailyListPage, payload)
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
          type: 'updateState',
          payload: {
            dailyList: data,
          },
        })
      }
      hideLoading()
    },
    *getDailyById({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.getDailyById, payload)
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
            dailyDetail: data,
          },
        })
      }
      hideLoading()
    },
    *saveDaily({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.saveDaily, payload)
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
    *getDailyInfo({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.getDailyInfo, payload)
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
    *getDailyObjList({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.getDailyObjList, payload)
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
    *getDetailWorkByPostionId({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.getDetailWorkByPostionId, payload)
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
    *getTomorrowContents({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any = {}
      try {
        const res = yield call(dataServices.getTomorrowContents, payload)
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
