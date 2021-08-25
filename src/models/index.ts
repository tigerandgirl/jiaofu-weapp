/*
 * @Author: yanxiaodi
 * @Date: 2020-09-14 18:33:59
 * @Last Modified by: qiufh
 * @Last Modified time: 2021-08-13 14:52
 */
const login = require('../pages/login/model').default
const index = require('../pages/index/model').default
const project = require('../packageD/pages/project/model').default
const daily = require('../packageC/pages/daily/model').default
const stakeholder = require('../packageB/pages/stakeholder/model').default
const safetycontent = require('../packageA/pages/safetycontent/model').default

export default [login, index, project, daily, stakeholder, safetycontent]
