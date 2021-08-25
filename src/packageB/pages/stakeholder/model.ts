/*
 * @Author: dangwei
 * @Date: 2021-08-19
 * @Last Modified by: dangwei
 * @Last Modified time: 2021-08-19 10:32:39
 */
import { showLoading, showToast, hideLoading } from '@tarojs/taro'
import cloneDeep from 'lodash/cloneDeep'
import * as dataServices from '../../../services/delivery'

interface SetAsyncData {
  payload: {
    stakeholderList: any[]
    communicationModeList: any[]
    communicator: any[]
    companyList: any[]
    logoAtts: any[]
    stakeholderDetail: any
  }
}
type InitState = {
  stakeholderList: any[]
  communicationModeList: any[]
  communicator: any[]
  companyList: any[]
  logoAtts: any[]
  stakeholderDetail: any
}

const initState: InitState = {
  stakeholderList: [],
  communicationModeList: [],
  communicator: [],
  companyList: [],
  logoAtts: [],
  stakeholderDetail: {
    id: '',
    name: '',
    taskId: '',
    copingStrategy: '',
    phone: '',
    position: '',
    sex: '',
    age: '',
    appellation: '',
    email: '',
    maritalStatus: '',
    monthlyIncome: '',
    hobby: '',
    profile: '',
    photo: '',
    wechat: '',
    communicatorId: '',
    communicatorName: '',
    communicationMode: [],
    remark: '',
    createTime: 0,
    createUserName: null,
    companyName: '',
    companyId: '',
  },
}

export default {
  namespace: 'stakeholder',
  state: initState,
  effects: {
    *getStakeholderList({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any[] = []
      try {
        const res = yield call(dataServices.getStakeholderList, payload)
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
            stakeholderList: data,
          },
        })
      }
      hideLoading()
    },
    *getBuildTeamFourItemListByProjectId({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any[] = []
      try {
        const res = yield call(
          dataServices.getBuildTeamFourItemListByProjectId,
          payload
        )
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
            communicationModeList: data,
          },
        })
      }
      hideLoading()
    },
    *getBuildTeamOneItemListByProjectId({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any[] = []
      try {
        const res = yield call(
          dataServices.getBuildTeamOneItemListByProjectId,
          payload
        )
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
            communicator: data,
          },
        })
      }
      hideLoading()
    },
    *saveStakeholder({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      // let data: any[] = []
      try {
        const res = yield call(dataServices.saveStakeholder, payload)
        /*if (!!res) {
          data = cloneDeep(res)
        }*/
        showToast({
          title: '请求成功',
          icon: 'success',
          duration: 1500,
        })
        hideLoading()
        return new Promise(resolve => resolve(res))
      } catch (e) {
        showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1500,
        })
      } finally {
        /*yield put({
          type: 'updateState',
          payload: {
            communicator: data
          }
        })*/
      }
      hideLoading()
    },
    *getStakeholderCompanyList({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any[] = []
      try {
        const res = yield call(dataServices.getStakeholderCompanyList, payload)
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
            companyList: data,
          },
        })
      }
      hideLoading()
    },
  },
  reducers: {
    updateState(state: InitState, { payload }: SetAsyncData) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
