/*
 * @Author: yanxiaodi
 * @Date: 2020-09-15 17:29:33
 * @Last Modified by: yanxiaodi
 * @Last Modified time: 2020-09-17 18:08:30
 */
import { showLoading, showToast, hideLoading } from '@tarojs/taro'
import cloneDeep from 'lodash/cloneDeep'
import * as dataServices from '../../../services/delivery'
import { delDocument } from '../../../services/delivery'

interface SetAsyncData {
  payload: {
    stepState: object
    documentList: any[]
    photos: any[]
    onlyShowEnclosureList: any[]
  }
}
type InitState = {
  stepState: object
  documentList: any[]
  photos: any[]
  onlyShowEnclosureList: any[]
}

const initState: InitState = {
  stepState: {},
  documentList: [],
  photos: [],
  onlyShowEnclosureList: [],
}

export default {
  namespace: 'safetycontent',
  state: initState,
  effects: {
    *getTaskStepState({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: object = {}
      try {
        const res = yield call(dataServices.getTaskStepState, payload)
        data = res
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
            stepState: data,
          },
        })
        return new Promise(resolve => resolve(data))
      }
      hideLoading()
    },
    *overTaskStep({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: object = {}
      try {
        const res = yield call(dataServices.overTaskStep, payload)
        data = res
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
        yield put({
          type: 'updateState',
          payload: {
            stepState: data,
          },
        })
        return new Promise(resolve => resolve(true))
      }
      hideLoading()
    },
    *reStartTaskStep({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: object = {}
      try {
        const res = yield call(dataServices.reStartTaskStep, payload)
        data = res
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
            stepState: data,
          },
        })
      }
      hideLoading()
    },
    *getDocumentList({ payload }, { call, put }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: any[] = []
      try {
        const res = yield call(dataServices.getDocumentList, payload)
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
        const attachments = data.map(item => {
          return Object.assign(
            {},
            {
              fileId: null,
              fileName: item.fileUrl,
              filePath: item.fileUrl,
              id: item.id,
              url: item.fileUrl,
              category: item.category,
            }
          )
        })
        yield put({
          type: 'updateState',
          payload: {
            documentList:
              (Array.isArray(attachments) &&
                attachments.filter(
                  item => item.category == '4' && item.url != null
                )) ||
              [],
            photos:
              (Array.isArray(attachments) &&
                attachments.filter(
                  item => item.category == '2' && item.url != null
                )) ||
              [],
          },
        })
      }
      hideLoading()
    },
    *updateDocument({ payload }, { call, put, select }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: object = {}
      try {
        const res = yield call(dataServices.updateDocument, payload)
        data = res
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
        return new Promise(resolve => resolve(true))
      }
      hideLoading()
    },
    *updateDocuments({ payload }, { call, put, select }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data: object = {}
      try {
        const res = yield call(dataServices.updateDocuments, payload)
        data = res
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
        return new Promise(resolve => resolve(true))
      }
      hideLoading()
    },
    *getOnlyShowEnclosureListByTaskIdAndIndex(
      { payload },
      { call, put }: DvaApi
    ) {
      showLoading({ title: 'loading...' })
      let data: any[] = []
      try {
        const res = yield call(
          dataServices.getOnlyShowEnclosureListByTaskIdAndIndex,
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
            onlyShowEnclosureList: data,
          },
        })
      }
      hideLoading()
    },
    *delDocument({ payload }, { call, put, select }: DvaApi) {
      showLoading({ title: 'loading...' })
      let data
      try {
        data = yield call(dataServices.delDocument, payload)
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
        return new Promise(resolve => resolve(data))
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
