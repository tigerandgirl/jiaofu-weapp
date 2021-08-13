/*
 * @Author: qiufh@bocspace.cn
 * @Date: 2021-08-10 23:41:11
 * @Last Modified by: qiufh
 * @Last Modified time: 2021-08-10 23:41:11
 */
import fetch from '../utils/request'
import Config from '../config'
import SchemaWc from '../utils/schema/wechat'
import Schemas from '../utils/schema/delivery'

export async function getProjectPageList(params: {}) {
  console.log('serivcesparams', params)
  return fetch.post(
    Config.delivery.getProjectPageList,
    Object.assign(
      {},
      {
        query: Schemas.delivery.getProjectPageList,
        variables: params,
      }
    )
  )
}
