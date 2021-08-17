/*
 * @Author: qiufh@bocspace.cn
 * @Date: 2021-08-10 23:41:11
 * @Last Modified by: qiufh
 * @Last Modified time: 2021-08-10 23:41:11
 */
import fetch from '../utils/request'
import Config from '../config'
import Schemas from '../utils/schema/delivery'

export async function getProjectPageList(params: {}) {
  return fetch.post(
    Config.delivery.getProjectPageList,
    { query: Schemas.delivery.getProjectPageList, variables: params },
    'getProjectPageList'
  )
}

export async function getProjectDetail(params: {}) {
  return fetch.post(
    Config.delivery.getProjectDetail,
    { query: Schemas.delivery.getProjectDetail, variables: params },
    'getProjectDetail'
  )
}

export async function getDailyListPage(params: {}) {
  return fetch.post(
    Config.delivery.getDailyListPage,
    { query: Schemas.delivery.getDailyListPage, variables: params },
    'getDailyListPage'
  )
}

export async function getDailyById(params: {}) {
  return fetch.post(
    Config.delivery.getDailyById,
    { query: Schemas.delivery.getDailyById, variables: params },
    'getDailyById'
  )
}

export async function saveDaily(params: {}) {
  return fetch.post(
    Config.delivery.saveDaily,
    { query: Schemas.delivery.saveDaily, variables: params },
    'saveDaily'
  )
}

export async function getDailyInfo(params: {}) {
  return fetch.post(
    Config.delivery.getDailyInfo,
    { query: Schemas.delivery.getDailyInfo, variables: params },
    'getDailyInfo'
  )
}

export async function getDailyObjList(params: {}) {
  return fetch.post(
    Config.delivery.getDailyObjList,
    { query: Schemas.delivery.getDailyObjList, variables: params },
    'getDailyObjList'
  )
}

export async function getDetailWorkByPostionId(params: {}) {
  return fetch.post(
    Config.delivery.getDetailWorkByPostionId,
    { query: Schemas.delivery.getDetailWorkByPostionId, variables: params },
    'getDetailWorkByPostionId'
  )
}
