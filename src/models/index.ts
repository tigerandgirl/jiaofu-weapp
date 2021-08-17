/*
 * @Author: yanxiaodi
 * @Date: 2020-09-14 18:33:59
 * @Last Modified by: qiufh
 * @Last Modified time: 2021-08-13 14:52
 */
const index = require('../pages/index/model').default
const project = require('../pages/project/model').default
const daily = require('../pages/daily/model').default
const counter = require('../pages/counter/model').default
const data = require('../pages/data/model').default
const map = require('../pages/map/model').default

export default [index, project, daily, counter, data, map]
