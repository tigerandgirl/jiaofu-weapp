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

export async function getProjectPageList2(params: {}) {
  return fetch.post(
    Config.delivery.getProjectPageList2,
    { query: Schemas.delivery.getProjectPageList2, variables: params },
    'getProjectPageList2'
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

export async function getStakeholderList(params: {}) {
  return fetch.post(
    Config.delivery.getStakeholderList,
    { query: Schemas.delivery.getStakeholderList, variables: params },
    'getStakeholderList'
  )
}

export async function getBuildTeamFourItemListByProjectId(params: {}) {
  return fetch.post(
    Config.delivery.getBuildTeamFourItemListByProjectId,
    {
      query: Schemas.delivery.getBuildTeamFourItemListByProjectId,
      variables: params,
    },
    'getBuildTeamFourItemListByProjectId'
  )
}

export async function getBuildTeamOneItemListByProjectId(params: {}) {
  return fetch.post(
    Config.delivery.getBuildTeamOneItemListByProjectId,
    {
      query: Schemas.delivery.getBuildTeamOneItemListByProjectId,
      variables: params,
    },
    'getBuildTeamOneItemListByProjectId'
  )
}

export async function saveStakeholder(params: {}) {
  return fetch.post(
    Config.delivery.saveStakeholder,
    { query: Schemas.delivery.saveStakeholder, variables: params },
    'saveStakeholder'
  )
}

export async function getStakeholderCompanyList(params: {}) {
  return fetch.post(
    Config.delivery.getStakeholderCompanyList,
    { query: Schemas.delivery.getStakeholderCompanyList, variables: params },
    'getStakeholderCompanyList'
  )
}

export async function getTomorrowContents(params: {}) {
  return fetch.post(
    Config.delivery.getTomorrowContents,
    { query: Schemas.delivery.getTomorrowContents, variables: params },
    'getTomorrowContents'
  )
}

export async function getDocumentList(params: {}) {
  return fetch.post(
    Config.delivery.getDocumentList,
    { query: Schemas.delivery.getDocumentList, variables: params },
    'getDocumentList'
  )
}

export async function getTaskStepState(params: {}) {
  return fetch.post(
    Config.delivery.getTaskStepState,
    { query: Schemas.delivery.getTaskStepState, variables: params },
    'getTaskStepState'
  )
}

export async function overTaskStep(params: {}) {
  return fetch.post(
    Config.delivery.overTaskStep,
    { query: Schemas.delivery.overTaskStep, variables: params },
    'overTaskStep'
  )
}

export async function reStartTaskStep(params: {}) {
  return fetch.post(
    Config.delivery.reStartTaskStep,
    { query: Schemas.delivery.reStartTaskStep, variables: params },
    'reStartTaskStep'
  )
}

export async function updateDocument(params: {}) {
  return fetch.post(
    Config.delivery.updateDocument,
    { query: Schemas.delivery.updateDocument, variables: params },
    'updateDocument'
  )
}

export async function updateDocuments(params: {}) {
  return fetch.post(
    Config.delivery.updateDocuments,
    { query: Schemas.delivery.updateDocuments, variables: params },
    'updateDocuments'
  )
}

export async function getOnlyShowEnclosureListByTaskIdAndIndex(params: {}) {
  return fetch.post(
    Config.delivery.getOnlyShowEnclosureListByTaskIdAndIndex,
    {
      query: Schemas.delivery.getOnlyShowEnclosureListByTaskIdAndIndex,
      variables: params,
    },
    'getOnlyShowEnclosureListByTaskIdAndIndex'
  )
}

export async function delDocument(params: {}) {
  return fetch.post(
    Config.delivery.delDocument,
    { query: Schemas.delivery.delDocument, variables: params },
    'delDocument'
  )
}
