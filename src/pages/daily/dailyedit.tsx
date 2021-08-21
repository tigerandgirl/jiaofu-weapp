/*
 * @Author: qiufh
 * @Date: 2020-09-14 19:44:38
 * @Last Modified by: yanxiaodi
 * @Last Modified time: 2020-09-17 18:12:39
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import {
  AtForm,
  AtInput,
  AtInputNumber,
  AtButton,
  AtList,
  AtListItem,
  AtTextarea,
  AtImagePicker,
  AtDrawer,
  AtFloatLayout,
  AtIcon,
  AtMessage,
  AtSwitch,
} from 'taro-ui'
import Table from 'taro3-table'
import isArray from 'lodash/isArray'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import Config from '../../config'

import './style.styl'

type PageStateProps = {
  dispatch: Function
  daily: any
  project: any
}
type IProps = PageStateProps

interface DailyEdit {
  props: IProps
}

const dateFormat = 'YYYY-MM-DD'

@connect(
  state => ({
    daily: state.daily,
    project: state.project,
  }),
  dispatch => ({
    dispatch,
  })
)
class DailyEdit extends Component {
  state = {
    date: moment(new Date()).format(dateFormat),
    planOverTime: moment(new Date()).format(dateFormat),
    selector: ['正常', '延期', '提前'],
    progressState: '正常',
    selectorWeather: ['晴', '雨', '雪', '大风', '雾'],
    weather: '晴',
    selectorTomorrowWeather: ['晴', '雨', '雪', '大风', '雾'],
    tomorrowWeather: '晴',
    workersCount: 0,
    countdownDay: 0,
    arrivalMaterialText: 0,
    distributionJson: '',
    material: '',
    tomorrowMaterial: '',
    assistance: '',
    summary: '',
    contentRemarks: '',
    files: [],
    files2: [],
    projectName: '',
    todayContents: [],
    tomorrowContents: [],
    dailyDocuments: [],
    ddDocuments: [
      {
        id: '',
        projectId: '',
        place: '',
        imageDocs: [],
        createTime: 0,
      },
      {
        id: '',
        projectId: '',
        place: '',
        imageDocs: [],
        createTime: 0,
      },
      {
        id: '',
        projectId: '',
        place: '',
        imageDocs: [],
        createTime: 0,
      },
      {
        id: '',
        projectId: '',
        place: '',
        imageDocs: [],
        createTime: 0,
      },
    ], // 定点照片临时存储
    ddDocumentsTmp: [
      {
        id: '',
        projectId: '',
        place: '',
        imageDocs: [],
        createTime: 0,
      },
      {
        id: '',
        projectId: '',
        place: '',
        imageDocs: [],
        createTime: 0,
      },
      {
        id: '',
        projectId: '',
        place: '',
        imageDocs: [],
        createTime: 0,
      },
      {
        id: '',
        projectId: '',
        place: '',
        imageDocs: [],
        createTime: 0,
      },
    ],
    ddDocumentsTmp2: [],
    buttonDisabled: false,
    imgList: [],
    daily: {
      boxCount: null,
      purpose: '',
      planOverTime: null,
      countdownDay: null,
      arrivalCount: null,
      installCount: null,
      onWayCount: null,
    },
    dataSource2: [{ first: '', last: '' }],
    dailyDetail: null,

    selectedRecord: null,
    selectedField: null,
    drawerVisible: false,
    drawerVisible2: false,
    drawerVisible3: false,
    productCategoryList: [],
    productCategoryList2: [],
    productCategoryValue: '',
    progressKey: '',
    progressValue: '',
    todayOrTomorrow: 1, //1:today,2:tomorrow
    switchFlag: false,
    summaryShare: 0,
  }

  componentWillMount() {
    const { project, daily } = this.props
    const { projectDetail } = project
    const { dailyDetail } = daily
    this.setState({
      projectName: !!projectDetail['name'] ? projectDetail['name'] : '',
    })

    this.getProductCategoryList()
    if (dailyDetail.id === null) {
      this.getDailyInfo()
    } else {
      this.setCurrentDailyDetail(dailyDetail)
    }
  }

  getProgressStateInfo = state => {
    let info = ''
    if (state === 0) {
      info = '正常'
    }
    if (state === 1) {
      info = '提前'
    }
    if (state === 2) {
      info = '延迟'
    }
    return info
  }

  getProgressStateByInfo = info => {
    let state = 0
    if (info === '正常') {
      state = 0
    }
    if (info === '提前') {
      state = 1
    }
    if (info === '延迟') {
      state = 2
    }
    return state
  }

  getProductCategoryList = () => {
    const { dispatch, project } = this.props
    const { projectDetail } = project
    dispatch({
      type: 'daily/getDailyObjList',
      payload: { dailyId: projectDetail.id, type: 0 },
    }).then(res => {
      if (res) {
        this.setState({ productCategoryList: res })
      }
    })
  }

  getProductCategoryList2 = params => {
    const { dispatch } = this.props
    dispatch({
      type: 'daily/getDetailWorkByPostionId',
      payload: params,
    }).then(res => {
      if (res) {
        this.setState({ productCategoryList2: res })
      }
    })
  }

  handleChange = (type, value) => {
    let obj
    obj[type] = value
    this.setState({
      obj,
    })
  }

  handleChangeInfo = (type, value) => {
    let obj
    obj[type] = value
    this.setState({
      obj,
    })
  }

  onChange = e => {
    this.setState({
      progressState: this.state.selector[e.detail.value],
    })
  }

  onChangeTodayWeather = e => {
    this.setState({
      weather: this.state.selectorWeather[e.detail.value],
    })
  }

  onChangeTomorrow = e => {
    this.setState({
      tomorrowWeather: this.state.selectorTomorrowWeather[e.detail.value],
    })
  }

  handleChangeWorkersCount = value => {
    this.setState({
      workersCount: value,
    })
  }

  handleChangeCountDownDay = value => {
    this.setState({
      countdownDay: value,
    })
  }

  handleChangeDCCL = value => {
    this.setState({
      arrivalMaterialText: value,
    })
  }

  handleChangePSJZ = value => {
    this.setState({
      distributionJson: value,
    })
  }

  handleChangeMaterial = value => {
    this.setState({
      material: value,
    })
  }

  handleChangeTomorrowMaterial = value => {
    this.setState({
      tomorrowMaterial: value,
    })
  }

  handleChangeAssistance = value => {
    this.setState({
      assistance: value,
    })
  }

  handleChangeSummary = value => {
    this.setState({
      summary: value,
    })
  }

  handleChangeContentRemarks = value => {
    this.setState({
      contentRemarks: value,
    })
  }

  handleChangeByType = (value, type) => {
    let obj = {}
    obj[type] = value
    this.setState({
      obj,
    })
  }

  onDateChange = e => {
    this.setState({
      date: e.detail.value,
    })
  }

  onPlanOverTimeChange = e => {
    this.setState({
      planOverTime: e.detail.value,
    })
  }

  // 上传
  onFileChange = (v, doType, index) => {
    // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    if (doType === 'remove') {
      this.setState({ imgList: v })
    } else {
      this.setState({ imgList: v })
    }
  }

  getUploadRes = url => {
    return new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: Config.multiUpload,
        filePath: url,
        name: 'file',
        header: {
          'Content-Type': 'multipart/form-data',
        },
        formData: {
          method: 'POST',
          fileType: 1,
        },
        success: function (res) {
          const data = JSON.parse(res.data).body
          resolve(data)
        },
        fail: function () {
          Taro.showToast({
            title: '上传失败',
            icon: 'none',
          })
        },
        complete: () => {
          Taro.hideLoading()
          console.log('uploadfilecomplete')
        },
      })
    })
  }

  // 上传
  onFileChange3(v, doType, index) {
    // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    console.log('v,doType,index', v, doType, index)
    const { dailyDocuments } = this.state
    if (doType === 'remove') {
      this.setState(() => {
        return {
          dailyDocuments: v,
        }
      })
      this.setState({
        dailyDocuments: Object.assign([], v),
      })
    } else {
      // 多张上传时，先去掉已经上传的图片，再上传新的图片
      Taro.showLoading({
        title: '上传中...',
        mask: true,
      })
      // 新增
      this.setState(
        () => {
          return {
            dailyDocuments: v,
          }
        },
        () => {
          let that = this
          // 已经上传的
          const oldArray: any = dailyDocuments.filter((item: any) => {
            return (
              !!item.fileUrl &&
              item.fileUrl.includes('xinlj.oss-cn-beijing.aliyuncs.com')
            )
          })

          // 未上传的
          const newArray = v.filter(vItem => {
            return !vItem.fileUrl
          })

          console.log(
            'oldArray, newArray=================================>',
            oldArray,
            newArray
          )
          let promises = newArray.map((item, index) => {
            return this.getUploadRes(item['url'])
          })

          Promise.all(promises)
            .then(allData => {
              // console.log("allData==========================>", allData)

              let newArr = allData.map((item: any) => {
                return Object.assign(
                  {},
                  {
                    fileId: item[0]['fileId'],
                    fileName: item[0]['fileName'],
                    filePath: item[0]['fileURL'],
                    id: item[0]['id'],
                    url: item[0]['fileURL'],
                  }
                )
              })
              console.log('newArr==========================>', newArr)
              that.setState({
                dailyDocuments: oldArray.concat(newArr),
              })
            })
            .catch(err => {
              console.log(err)
              Taro.hideLoading()
            })
        }
      )
    }
  }

  // 上传
  onFileChangeDD(v, doType, index) {
    // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    console.log(
      'v==========v, doType, index=======================>',
      v,
      doType,
      index
    )
    const { ddDocuments } = this.state

    if (doType === 'remove') {
      this.setState(() => {
        return {
          ddDocuments: v,
        }
      })
      this.setState({
        ddDocuments: Object.assign([], v),
      })
    } else {
      // 多张上传时，先去掉已经上传的图片，再上传新的图片
      if (ddDocuments.length === 4) {
        Taro.atMessage({
          message: '最多上传4张照片',
          type: 'warning',
        })
        return false
      }

      console.log('v=================================>', v)

      // 新增
      this.setState(
        () => {
          console.log('v====vvvvvvvvvvvvvvvvv=============================>', v)
          return {
            ddDocuments: v,
          }
        },
        () => {
          let that = this
          // 已经上传的
          console.log(
            'v====已经上传的=============================>',
            ddDocuments
          )
          const oldArray = ddDocuments.map(item => {
            return item.fileId
          })
          // 未上传的
          console.log('v====未上传的=============================>', v)
          const newArray = v.filter(vitem => {
            if (!oldArray.includes(vitem.fileId)) {
              return vitem
            }
          })
          //console.log(v, '上传图片数', oldArray, newArray)

          // 循环上传
          for (let i = 0; i < newArray.length; i++) {
            console.log(
              'v====循环上传=============================>',
              newArray[i]
            )
            Taro.showLoading({
              title: '上传中...',
              mask: true,
            })
            //上传图片
            Taro.uploadFile({
              url: Config.multiUpload,
              filePath: newArray[i].url,
              name: 'file',
              header: {
                'Content-Type': 'multipart/form-data',
              },
              formData: {
                method: 'POST',
                fileType: 1,
              },
              success: function (res) {
                console.log(
                  'resupload================================================================>',
                  res
                )
                const data = JSON.parse(res.data).body
                console.log(
                  'resupload================================================================>',
                  data
                )
                // 保存附件
                const attachments =
                  ddDocuments == null
                    ? []
                    : JSON.parse(JSON.stringify(ddDocuments))
                // 过滤已经上传的
                // if (!attachments.includes(data[0].fileId)) {
                //
                // }

                attachments.push({
                  fileId: data[0].fileId,
                  fileName: data[0].fileName,
                  filePath: data[0].fileURL,
                  id: data[0].id,
                  url: data[0].fileURL,
                })

                that.setState({
                  ddDocumentsTmp: attachments,
                })
              },
              fail: function () {
                Taro.hideLoading()
                Taro.showToast({
                  title: '上传失败',
                  icon: 'none',
                })
              },
              complete: () => {
                // Taro.hideLoading()
              },
            })
          }
        }
      )
    }
  }

  // 上传
  onFileChange4(v, doType, index) {
    // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    const { ddDocuments, ddDocumentsTmp } = this.state
    if (doType === 'remove') {
      this.setState(() => {
        return {
          ddDocuments: v,
        }
      })
      this.setState({
        ddDocuments: Object.assign([], v),
      })
    } else {
      // 多张上传时，先去掉已经上传的图片，再上传新的图片
      if (ddDocuments.length === 4) {
        Taro.atMessage({
          message: '最多上传4张照片',
          type: 'warning',
        })
        return false
      }
      Taro.showLoading({
        title: '上传中...',
        mask: true,
      })
      // 新增
      this.setState(
        () => {
          return {
            ddDocuments: v,
          }
        },
        () => {
          let that = this
          // 已经上传的
          const oldArray: any = ddDocuments.filter((item: any) => {
            return (
              !!item.imageDocs &&
              isArray(item.imageDocs) &&
              item.imageDocs.length > 0 &&
              item.imageDocs[0].fileUrl.includes(
                'xinlj.oss-cn-beijing.aliyuncs.com'
              )
            )
          })

          // 未上传的
          const newArray = v.filter((vItem: any) => {
            return !vItem.imageDocs
          })

          console.log(
            'oldArray, newArray=================================>',
            oldArray,
            newArray
          )
          let promises = newArray.map((item, index) => {
            return this.getUploadRes(item['url'])
          })

          Promise.all(promises)
            .then(allData => {
              console.log('allData==========================>', allData)

              let newdps = allData.map((item: any) => {
                return Object.assign(
                  {},
                  {
                    imageDocs: [
                      {
                        name: item[0]['fileName'],
                        fileUrl: item[0]['fileURL'],
                        id: item[0]['id'],
                      },
                    ],
                  }
                )
              })
              console.log('newArr==========================>', newdps)
              console.log('ddDocuments==========================>', ddDocuments)
              const nowDps = oldArray.concat(newdps)
              const newDailyProjectPhotos = ddDocumentsTmp
                .map((ddtItem, index) => {
                  let tmpDDitem = Object.assign(ddtItem)
                  if (index < nowDps.length) {
                    tmpDDitem = Object.assign(tmpDDitem, {
                      imageDocs: [
                        Object.assign(
                          !!tmpDDitem['imageDocs'] &&
                            isArray(tmpDDitem['imageDocs']) &&
                            tmpDDitem['imageDocs'].length > 0
                            ? tmpDDitem['imageDocs'][0]
                            : {},
                          {
                            name: nowDps[index]['imageDocs'][0]['name'],
                            fileUrl: nowDps[index]['imageDocs'][0]['fileUrl'],
                            id: nowDps[index]['imageDocs'][0]['id'],
                          }
                        ),
                      ],
                    })
                  }
                  return tmpDDitem
                })
                .filter((item, index) => {
                  return index < nowDps.length
                })

              const tmpDD = newDailyProjectPhotos
                .map((item: any, index) => {
                  let imageDocs =
                    !!item.imageDocs &&
                    isArray(item.imageDocs) &&
                    item.imageDocs.length > 0
                      ? item.imageDocs[0]['fileUrl']
                      : ''
                  return Object.assign({}, item, { url: imageDocs, key: index })
                })
                .filter(item => {
                  return item.url !== null
                })

              that.setState({
                ddDocuments: tmpDD,
                // ddDocumentsTmp: newDailyProjectPhotos,
              })
              Taro.hideLoading()
            })
            .catch(err => {
              console.log(err)
              Taro.hideLoading()
            })
        }
      )
    }
  }

  // 上传
  onFileChange2(v, doType, index) {
    // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    console.log('v,doType,index', v, doType, index)
    const { dailyDocuments } = this.state
    if (doType === 'remove') {
      this.setState(() => {
        return {
          dailyDocuments: v,
        }
      })
      this.setState({
        dailyDocuments: Object.assign([], v),
      })
    } else {
      // 多张上传时，先去掉已经上传的图片，再上传新的图片

      // 新增
      this.setState(
        () => {
          return {
            dailyDocuments: v,
          }
        },
        () => {
          let that = this
          // 已经上传的
          const oldArray = dailyDocuments.map(item => {
            return item.id
          })
          // 未上传的
          const newArray = v.filter(vitem => {
            if (!oldArray.includes(vitem.fileId)) {
              return vitem
            }
          })
          //console.log(v, '上传图片数', oldArray, newArray)

          // 循环上传
          for (let i = 0; i < newArray.length; i++) {
            Taro.showLoading({
              title: '上传中...',
              mask: true,
            })
            //上传图片
            Taro.uploadFile({
              url: Config.multiUpload,
              filePath: newArray[i].url,
              name: 'file',
              header: {
                'Content-Type': 'multipart/form-data',
              },
              formData: {
                method: 'POST',
                fileType: 1,
              },
              success: function (res) {
                const data = JSON.parse(res.data).body
                // 保存附件
                const attachments =
                  dailyDocuments == null
                    ? []
                    : JSON.parse(JSON.stringify(dailyDocuments))
                // 过滤已经上传的
                // if (!attachments.includes(data[0].fileId)) {
                //
                // }
                attachments.push({
                  fileId: data[0].fileId,
                  fileName: data[0].fileName,
                  filePath: data[0].fileURL,
                  id: data[0].id,
                  url: data[0].fileURL,
                })
                console.log('xczp=========================>', attachments)
                that.setState({
                  dailyDocuments: Object.assign(attachments),
                })
              },
              fail: function () {
                Taro.hideLoading()
                Taro.showToast({
                  title: '上传失败',
                  icon: 'none',
                })
              },
              complete: () => {
                Taro.hideLoading()
              },
            })
          }
        }
      )
    }
  }

  onImgChange1(dailyDocuments) {
    this.setState({
      dailyDocuments,
    })
  }

  onImageClick1 = (index, file) => {
    Taro.previewImage({
      current: file.url,
      urls: this.state.dailyDocuments.map(item => {
        return item.url
      }),
    })
  }

  onImgChange2(files) {
    this.setState({
      files,
    })
  }

  onImageClick2 = (index, file) => {
    Taro.previewImage({
      current: file.url,
      urls: this.state.files.map(item => {
        return item.url
      }),
    })
  }
  onFail(mes) {
    // console.log(mes)
  }

  onSubmit(event) {
    // console.log()
  }
  onReset(event) {}

  addTodayContent = () => {
    const { todayContents } = this.state
    let key = todayContents.length
    let newData: any = [
      {
        key: key,
        id: '',
        position: '',
        productDetail: '',
        palnProgress: 0,
        actualProgress: 0,
      },
    ]
    const newList = todayContents.concat(newData)
    this.setState({
      todayContents: newList,
    })
  }

  removeEndTodayContent = () => {
    const { todayContents } = this.state
    this.setState({
      todayContents: todayContents.slice(0, -1),
    })
  }

  addTomorrowContent = () => {
    const { tomorrowContents } = this.state
    let key = tomorrowContents.length
    let newData: any = [
      {
        key: key,
        id: '',
        position: '',
        productDetail: '',
        palnProgress: 0,
        actualProgress: 0,
      },
    ]
    const newList = tomorrowContents.concat(newData)
    this.setState({
      tomorrowContents: newList,
    })
  }

  removeEndTomorrowContent = () => {
    const { tomorrowContents } = this.state
    this.setState({
      tomorrowContents: tomorrowContents.slice(0, -1),
    })
  }

  updateTomorrowContents = () => {
    const { todayContents, date } = this.state
    const { daily, project, dispatch } = this.props
    const { projectDetail } = project
    let newTodayContents = !!todayContents
      ? todayContents.map((item, index) => {
          const { key, productCategoryList, productDetailList, ...obj } = item
          return obj
        })
      : []

    const params = {
      projectId: projectDetail.id,
      contents: newTodayContents,
      dateTime: moment(date).valueOf(),
    }

    dispatch({
      type: 'daily/getTomorrowContents',
      payload: params,
    }).then(res => {
      if (res && Array.isArray(res)) {
        this.saveTomorrowContents(res)
      }
    })
  }

  saveTomorrowContents = dataSource => {
    this.setState({
      tomorrowContents: dataSource.map(item => {
        return Object.assign(item, { type: 0 })
      }),
    })
  }

  openFloatLayout = (type, record) => {
    this.setState({
      selectedRecord: record,
      selectedField: type,
      drawerVisible: true,
    })
  }

  openFloatLayout2 = (type, record) => {
    this.setState({
      selectedRecord: record,
      selectedField: type,
      drawerVisible2: true,
    })
  }

  openFloatSetProgress = (type, record) => {
    this.setState({
      selectedRecord: record,
      progressKey: type,
      drawerVisible3: true,
    })
  }

  handleSetProdcut = () => {
    const { selectedRecord, productCategoryValue } = this.state
    this.handleEditTodayContent(
      { position: productCategoryValue, positionId: '' },
      selectedRecord
    )
    this.setState({
      drawerVisible: false,
    })
  }

  handleSetCategory = () => {
    const { selectedRecord, productCategoryValue, todayOrTomorrow } = this.state
    if (todayOrTomorrow === 1) {
      this.handleEditTodayContent(
        { position: productCategoryValue, positionId: '' },
        selectedRecord
      )
    } else {
      this.handleEditTomorrowContent(
        { position: productCategoryValue, positionId: '' },
        selectedRecord
      )
    }

    this.setState({
      drawerVisible: false,
    })
  }

  handleSetCategoryCol2 = () => {
    const { selectedRecord, productCategoryValue, todayOrTomorrow } = this.state
    if (todayOrTomorrow === 1) {
      this.handleEditTodayContent(
        { productDetail: productCategoryValue, productDetailId: '' },
        selectedRecord
      )
    } else {
      this.handleEditTomorrowContent(
        { productDetail: productCategoryValue, productDetailId: '' },
        selectedRecord
      )
    }

    this.setState({
      drawerVisible2: false,
    })
  }

  handleSetCategory2 = value => {
    const { selectedRecord, todayOrTomorrow } = this.state
    if (todayOrTomorrow === 1) {
      this.handleEditTodayContent(
        { position: value.name, positionId: value.id },
        selectedRecord
      )
    } else {
      this.handleEditTomorrowContent(
        { position: value.name, positionId: value.id },
        selectedRecord
      )
    }

    this.setState({
      drawerVisible: false,
    })
  }

  handleSetCategory3 = value => {
    const { selectedRecord, todayOrTomorrow } = this.state

    if (todayOrTomorrow === 1) {
      this.handleEditTodayContent(
        {
          productDetail: value.productDetail,
          productDetailId: value.productDetailId,
        },
        selectedRecord
      )
    } else {
      this.handleEditTomorrowContent(
        {
          productDetail: value.productDetail,
          productDetailId: value.productDetailId,
        },
        selectedRecord
      )
    }

    this.setState({
      drawerVisible2: false,
    })
  }

  handleSetProgress = () => {
    const {
      selectedRecord,
      todayOrTomorrow,
      progressValue,
      progressKey,
    } = this.state
    let obj = {}
    obj[progressKey] = progressValue
    if (todayOrTomorrow === 1) {
      this.handleEditTodayContent(obj, selectedRecord)
    } else {
      this.handleEditTomorrowContent(obj, selectedRecord)
    }

    this.setState({
      drawerVisible3: false,
    })
  }

  showCategoryFloat = (type, value, record) => {
    this.setState({
      selectedRecord: record,
      drawerVisible: true,
    })
  }

  handleEditTodayContent = (obj, record) => {
    const { todayContents } = this.state
    let newList = Object.assign(todayContents)
    newList = newList.map((item: any, index: number) => {
      if (record['key'] === index) {
        item = Object.assign(item, obj)
      }
      return item
    })

    this.setState({
      todayContents: newList,
      selectedRecord: record,
    })
  }

  handleEditTomorrowContent = (obj, record) => {
    const { tomorrowContents } = this.state
    let newList = Object.assign(tomorrowContents)
    newList = newList.map((item: any, index: number) => {
      if (record['key'] === index) {
        item = Object.assign(item, obj)
      }
      return item
    })

    this.setState({
      tomorrowContents: newList,
      selectedRecord: record,
    })
  }

  removeTodayConent = () => {}

  addTommrowContent = () => {}

  removeTommrowConent = () => {}

  saveAndUpload = (files: any) => {
    this.setState({ buttonDisabled: true }, () => {
      Taro.showLoading({
        title: '上传中...',
      })
      files.forEach((item, index) => {})
    })
  }

  genDailyDocmentName = (item, index) => {
    const { date } = this.state
    const { daily, project } = this.props
    const { projectDetail } = project
    const num = index + 1 < 10 ? '0' + (index + 1) : index + 1

    return '日报_' + date + '_0' + num + '_' + projectDetail.name
  }

  getDailyInfo = () => {
    const { project, daily, dispatch } = this.props
    const { dailyDetail } = daily
    const { projectDetail } = project
    const projectId = projectDetail.id
    const field = Object.assign(dailyDetail)
    const params = {
      projectId: projectId,
      dateTime: moment(this.state.date).valueOf(),
    }
    dispatch({
      type: 'daily/getDailyInfo',
      payload: params,
    }).then(res => {
      if (res === null) {
        this.setState({
          daily: Object.assign(
            {},
            {
              boxCount: null,
              purpose: '',
              planOverTime: null,
              countdownDay: null,
              arrivalCount:
                field.arrivalCount == -1 ? null : field.arrivalCount,
              installCount:
                field.installCount == -1 ? null : field.installCount,
              onWayCount: field.onWayCount == -1 ? null : field.onWayCount,
            }
          ),
        })
      } else {
        if (
          res.dailyProjectPhotos != null &&
          Array.isArray(res.dailyProjectPhotos)
        ) {
          const tmpDD = res.dailyProjectPhotos
            .map((item: any, index) => {
              let imageDocs =
                !!item.imageDocs &&
                isArray(item.imageDocs) &&
                item.imageDocs.length > 0
                  ? item.imageDocs[0]['fileUrl']
                  : ''
              return Object.assign({}, item, { url: imageDocs, key: index })
            })
            .filter(item => {
              return item.url !== null
            })

          this.setState({
            ddDocuments: tmpDD,
            ddDocumentsTmp: res.dailyProjectPhotos,
            ddDocumentsTmp2: tmpDD,
          })
        }
        this.setState({
          countdownDay: res.countdownDay,
          todayContents:
            !!res.contents && isArray(res.contents) ? res.contents : [],
        })
      }
    })
  }

  setCurrentDailyDetail = dd => {
    let title = ''
    if (!!dd.id) {
      const tmpDD = dd.dailyProjectPhotos
        .map((item: any, index) => {
          let imageDocs =
            !!item.imageDocs &&
            isArray(item.imageDocs) &&
            item.imageDocs.length > 0
              ? item.imageDocs[0]['fileUrl']
              : ''
          return Object.assign({}, item, { url: imageDocs, key: index })
        })
        .filter(item => {
          return !!item.url
        })

      this.setState({
        planOverTime: moment(dd.planOverTime).format(dateFormat),
        progressState: this.getProgressStateInfo(dd.progressState),
        weather: dd.weather,
        tomorrowWeather: dd.tomorrowWeather,
        workersCount: dd.workersCount,
        countdownDay: dd.countdownDay,
        arrivalMaterialText: dd.arrivalMaterialText,
        distributionJson:
          !!dd.distributionJson && this.isJsonString(dd.distributionJson)
            ? ''
            : dd.distributionJson,
        material: dd.material,
        tomorrowMaterial: dd.tomorrowMaterial,
        assistance: dd.assistance,
        summary: dd.summary,
        summaryShare: dd.summaryShare,
        contentRemarks: dd.contentRemarks,
        todayContents: dd.contents,
        tomorrowContents:
          !!dd.tomorrowContents && isArray(dd.tomorrowContents)
            ? dd.tomorrowContents
            : [],
        dailyDocuments: dd.dailyDocuments
          .map((item, index) => {
            return Object.assign({}, item, { url: item.fileUrl, key: index })
          })
          .filter(item => {
            return item.url !== null
          }),
        ddDocumentsTmp: dd.dailyProjectPhotos,
        ddDocuments: tmpDD,
        ddDocumentsTmp2: tmpDD,
      })
      title = '日报编辑'
    } else {
      title = '日报填写'
    }
    Taro.setNavigationBarTitle({
      title: title,
    })
  }

  showDailyProjectPhotos = () => {
    const { daily } = this.props
    const { dailyDetail } = daily
    const { ddDocuments } = this.state

    let dds: any = []

    if (!!ddDocuments && isArray(ddDocuments)) {
      dds = ddDocuments
        .map((item: any, index) => {
          let imageDocs =
            !!item.imageDocs &&
            isArray(item.imageDocs) &&
            item.imageDocs.length > 0
              ? item.imageDocs[0]['fileUrl']
              : ''
          return Object.assign({}, { url: imageDocs, key: index })
        })
        .filter(item => {
          return item.url !== null
        })
    }

    return dds
  }

  handleChangeProductCategory = value => {
    this.setState({
      productCategoryValue: value,
    })
  }

  handleChangeProgress = value => {
    this.setState({
      progressValue: value,
    })
  }

  handleSwitchChange = value => {
    this.setState({
      summaryShare: value ? 1 : 0,
    })
  }

  submitPublish = e => {
    e.preventDefault()
    const { project, daily, dispatch } = this.props
    const { projectDetail } = project
    const { dailyDetail } = daily
    const {
      date,
      planOverTime,
      progressState,
      weather,
      tomorrowWeather,
      workersCount,
      countdownDay,
      arrivalMaterialText,
      distributionJson,
      material,
      tomorrowMaterial,
      assistance,
      summary,
      summaryShare,
      contentRemarks,
      dailyDocuments,
      ddDocuments,
      todayContents,
      tomorrowContents,
    } = this.state

    if (ddDocuments.length < 4) {
      Taro.atMessage({
        message: '定点照片需要上传4张',
        type: 'warning',
      })
      return false
    }

    let newDailyDocuments = dailyDocuments.map((item: any, index) => {
      if (item) {
        // 区分视频和图片
        const isVideo = /\.(avi|dat|mpg|wmv|asf|rm|rmvb|mov|flv|mp4|3gp|dv|divx|qt|asx)$/.test(
          item.name
        ) // 视频
        if (isVideo) {
          return Object.assign(
            {},
            {
              name: item.name,
              fileUrl:
                item.filePath !== undefined && item.filePath !== null
                  ? item.filePath
                  : item.fileUrl,
              category: 3,
              id: item.id,
              isVisible: 1,
            }
          )
        } else {
          // 图片
          return Object.assign(
            {},
            {
              name: item.name,
              fileUrl:
                item.filePath !== undefined && item.filePath !== null
                  ? item.filePath
                  : item.fileUrl,
              category: 2,
              id: item.id,
              isVisible: 1,
            }
          )
        }
      }
    })
    newDailyDocuments = [...new Set(newDailyDocuments)]

    let newDDs = ddDocuments.map((item: any) => {
      const { key, url, ...obj } = item
      return obj
    })

    let newDaily = Object.assign(
      {},
      {
        contents: todayContents.map((item: any) => {
          const { key, ...obj } = item
          return obj
        }),
        tomorrowContents: tomorrowContents.map((item: any) => {
          const { key, ...obj } = item
          return obj
        }),
        weather: weather,
        tomorrowWeather: tomorrowWeather,
        progressState: this.getProgressStateByInfo(progressState),
        workersCount: workersCount,
        countdownDay: countdownDay,
        arrivalMaterialText: arrivalMaterialText,
        material: material,
        tomorrowMaterial: tomorrowMaterial,
        distributionJson: distributionJson,
        dailyDocuments: newDailyDocuments.map((item: any, index) => {
          const { key, url, ...obj } = item
          return Object.assign(obj, {
            name: this.genDailyDocmentName(item, index),
            orders: index + 1,
          })
        }),
        dailyProjectPhotos: newDDs,
        title: date + ' 日报',
        date: moment(date).valueOf(),
        planOverTime: moment(planOverTime).valueOf(),
        projectId: projectDetail.id,
        summary: summary,
        summaryShare: summaryShare,
        assistance: assistance,
        contentRemarks: contentRemarks,
      }
    )
    if (dailyDetail.id !== null) {
      newDaily = Object.assign(dailyDetail, newDaily)
    }
    // return false
    dispatch({
      type: 'daily/saveDaily',
      payload: { d: newDaily, saveType: 2 },
    }).then(res => {
      dispatch({
        type: 'daily/getDailyListPage',
        payload: {
          text: '',
          projectId: projectDetail.id,
          type: 0,
          pageIndex: 1,
          pageSize: 10,
        },
      })
      // 查询数据
      Taro.navigateTo({
        url: '/pages/daily/index',
      })
    })
  }

  isJsonString = str => {
    try {
      if (typeof JSON.parse(str) === 'object') {
        return true
      }
    } catch (error) {
      return false
    }
  }

  render() {
    const {
      projectName,
      todayContents,
      tomorrowContents,
      ddDocuments,
      drawerVisible,
      drawerVisible2,
      drawerVisible3,
      productCategoryList,
      productCategoryList2,
      productCategoryValue,
      progressValue,
      distributionJson,
      arrivalMaterialText,
      summaryShare,
    } = this.state
    const { daily } = this.props
    const { dailyDetail } = daily

    const columns: any = [
      {
        title: '楼栋',
        dataIndex: 'position',
        render: (text, record) => {
          return (
            <View
              onClick={() => {
                this.setState({ todayOrTomorrow: 1, productCategoryValue: '' })
                this.openFloatLayout('position', record)
              }}
            >
              {text === '' ? '添加内容' : text}
            </View>
          )
        },
      },
      {
        title: '施工任务',
        dataIndex: 'productDetail',
        render: (text, record) => {
          return (
            <View
              onClick={() => {
                if (!!record['positionId'] && record['positionId'] !== '') {
                  this.getProductCategoryList2({
                    positionId: record['positionId'],
                    datetime: 0,
                  })
                }
                this.setState({ todayOrTomorrow: 1, productCategoryValue: '' })
                this.openFloatLayout2('productDetail', record)
              }}
            >
              {text === '' ? '添加内容' : text}
            </View>
          )
        },
      },

      {
        title: '计划进度',
        dataIndex: 'palnProgress',
        render: (text, record) => {
          return (
            <View
              onClick={() => {
                this.setState({ todayOrTomorrow: 1, progressValue: '' })
                this.openFloatSetProgress('palnProgress', record)
              }}
            >
              {text === '0%' ? '添加内容' : text + '%'}
            </View>
          )
        },
      },
      {
        title: '实际进度',
        dataIndex: 'actualProgress',
        render: (text, record) => {
          return (
            <View
              onClick={() => {
                this.setState({ todayOrTomorrow: 1, progressValue: '' })
                this.openFloatSetProgress('actualProgress', record)
              }}
            >
              {text === '0%' ? '添加内容' : text + '%'}
            </View>
          )
        },
      },
    ]

    const columns2: any = [
      {
        title: '楼栋',
        dataIndex: 'position',
        render: (text, record) => {
          return (
            <View
              onClick={() => {
                this.setState({ todayOrTomorrow: 2, productCategoryValue: '' })
                this.openFloatLayout('position', record)
              }}
            >
              {text === '' ? '添加内容' : text}
            </View>
          )
        },
      },
      {
        title: '施工任务',
        dataIndex: 'productDetail',
        render: (text, record) => {
          return (
            <View
              onClick={() => {
                if (!!record['positionId'] && record['positionId'] !== '') {
                  this.getProductCategoryList2({
                    positionId: record['positionId'],
                    datetime: 0,
                  })
                }
                this.setState({ todayOrTomorrow: 2, productCategoryValue: '' })
                this.openFloatLayout2('productDetail', record)
              }}
            >
              {text === '' ? '添加内容' : text}
            </View>
          )
        },
      },

      {
        title: '计划进度',
        dataIndex: 'palnProgress',
        className: 'fe',
        render: (text, record) => {
          return (
            <View
              onClick={() => {
                this.setState({ todayOrTomorrow: 2, progressValue: '' })
                this.openFloatSetProgress('palnProgress', record)
              }}
            >
              {text === '0%' ? '添加内容' : text + '%'}
            </View>
          )
        },
      },

      // {
      //   title: '实际进度',
      //   dataIndex: 'actualProgress',
      //   render: (text, record) => {
      //     return (
      //       <View
      //         onClick={() => {
      //           this.setState({ todayOrTomorrow: 2, progressValue: '' })
      //           this.openFloatSetProgress('actualProgress', record)
      //         }}
      //       >
      //         {text === '0%' ? '添加内容' : text + '%'}
      //       </View>
      //     )
      //   },
      // },
    ]

    return (
      <View>
        <View className="daily-edit">
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <AtList>
              <View className="at-row vc">
                <View className="at-col ">
                  <AtInput
                    name="value"
                    title="标题"
                    type="text"
                    placeholder="标题"
                    value={projectName}
                    onChange={value => {
                      this.handleChangeInfo('projectName', value)
                    }}
                  />
                </View>
              </View>
            </AtList>

            <AtList>
              <View className="at-row vc">
                <View className="at-col">
                  <Picker mode="date" onChange={this.onDateChange}>
                    <AtList>
                      <AtListItem
                        title="日期"
                        extraText={this.state.date + ''}
                      />
                    </AtList>
                  </Picker>
                </View>
                <View className="at-col">
                  <Picker
                    mode="selector"
                    range={this.state.selector}
                    onChange={this.onChange}
                  >
                    <AtList>
                      <AtListItem
                        title="进度"
                        extraText={this.state.progressState + ''}
                      />
                    </AtList>
                  </Picker>
                </View>
              </View>
            </AtList>

            <AtList>
              <View className="at-row vc">
                <View className="at-col">
                  <Picker
                    mode="selector"
                    range={this.state.selectorWeather}
                    onChange={this.onChangeTodayWeather}
                  >
                    <AtList>
                      <AtListItem
                        title="今日天气"
                        extraText={this.state.weather}
                      />
                    </AtList>
                  </Picker>
                </View>
                <View className="at-col">
                  <View className="vc pl30">
                    <Text className="title">工人</Text>
                    <AtInput
                      border={false}
                      type="text"
                      value={this.state.workersCount}
                      onChange={this.handleChangeWorkersCount}
                    />
                  </View>
                </View>
              </View>
            </AtList>

            <AtList>
              <View className="at-row vc">
                <View className="at-col">
                  <AtListItem
                    title="计划完成时间"
                    extraText={
                      dailyDetail.planOverTime === 0
                        ? '无'
                        : moment(dailyDetail.planOverTime).format(dateFormat)
                    }
                    hasBorder={false}
                  />
                </View>
                <View className="at-col ">
                  <View className="vr pr20">
                    <Text>倒计时</Text>
                    <Text className="ml15">
                      {!!this.state.countdownDay
                        ? this.state.countdownDay + ' 天'
                        : '0 天'}
                    </Text>
                  </View>
                </View>
              </View>
            </AtList>

            <AtList>
              <View className="at-row vc">
                <View className="at-col ">
                  <AtInput
                    border={false}
                    title="配送进展"
                    name="distributionJson"
                    type="text"
                    placeholder="请输入"
                    value={distributionJson}
                    onChange={this.handleChangePSJZ}
                  />
                </View>
              </View>
            </AtList>

            <AtList>
              <View className="at-row">
                <View className="at-col vcc">
                  <AtInput
                    border={false}
                    title="到场材料"
                    name="arrivalMaterialText"
                    type="number"
                    placeholder="请输入"
                    value={parseInt(arrivalMaterialText + '')}
                    onChange={this.handleChangeDCCL}
                  />
                  <Text>%</Text>
                </View>
                <View className="at-col"></View>
              </View>
            </AtList>

            <AtList>
              <View className="at-row vc">
                <View className="at-col">
                  <AtInput
                    border={false}
                    title="进场材料"
                    name="material"
                    type="text"
                    placeholder="请输入"
                    value={this.state.material}
                    onChange={this.handleChangeMaterial}
                  />
                </View>
                <View className="at-col"></View>
              </View>
            </AtList>

            <View
              className="vc"
              style={{ marginTop: '30rpx', marginBottom: '15rpx' }}
            >
              <Text style={{ fontSize: '32rpx', paddingLeft: '24rpx' }}>
                今日施工内容
              </Text>
              <View className="vc">
                <AtButton
                  className="ml15"
                  circle={true}
                  onClick={this.addTodayContent}
                  type="secondary"
                  size="small"
                >
                  添加内容
                </AtButton>
                <AtButton
                  className="ml15"
                  circle={true}
                  onClick={this.removeEndTodayContent}
                  type="secondary"
                  size="small"
                >
                  删除末行
                </AtButton>
              </View>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center' }}>
              <Table
                style={{
                  width: '100vw',
                }}
                colStyle={{
                  padding: '5px 5px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                rowKey="key"
                columns={columns}
                dataSource={todayContents.map((item, index) => {
                  return Object.assign(item, { key: index })
                })}
              />
            </View>

            <View
              className="vc"
              style={{ marginTop: '30rpx', marginBottom: '15rpx' }}
            >
              <Text style={{ fontSize: '32rpx', paddingLeft: '24rpx' }}>
                明日施工计划
              </Text>
              <View className="vc">
                <AtButton
                  circle={true}
                  onClick={this.updateTomorrowContents}
                  type="secondary"
                  size="small"
                >
                  更新
                </AtButton>
                <AtButton
                  className="ml15"
                  circle={true}
                  onClick={this.addTomorrowContent}
                  type="secondary"
                  size="small"
                >
                  添加内容
                </AtButton>
                <AtButton
                  className="ml15"
                  circle={true}
                  onClick={this.removeEndTomorrowContent}
                  type="secondary"
                  size="small"
                >
                  删除末行
                </AtButton>
              </View>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center' }}>
              <Table
                style={{
                  width: '100vw',
                }}
                colStyle={{
                  padding: '5px 5px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                rowKey="key"
                columns={columns2}
                dataSource={tomorrowContents.map((item, index) => {
                  return Object.assign(item, { key: index })
                })}
              />
            </View>

            <View
              className="vc"
              style={{ marginTop: '30rpx', marginBottom: '15rpx' }}
            >
              <Text style={{ fontSize: '32rpx', paddingLeft: '24rpx' }}>
                现场照片
              </Text>
              <View></View>
            </View>
            <View>
              <AtImagePicker
                multiple={true}
                // onImageClick={this.onImageClick1}
                files={this.state.dailyDocuments}
                onChange={this.onFileChange3.bind(this)}
              />
            </View>

            <View
              className="vc"
              style={{ marginTop: '30rpx', marginBottom: '15rpx' }}
            >
              <View>
                <Text style={{ fontSize: '32rpx', paddingLeft: '24rpx' }}>
                  定点照片
                </Text>
                <Text
                  style={{
                    fontSize: '28rpx',
                    paddingLeft: '12rpx',
                    color: '#228B22',
                  }}
                >
                  (请上传横向拍摄照片)
                </Text>
              </View>
              <View></View>
            </View>
            <View>
              <AtImagePicker
                length={4}
                multiple={true}
                // onImageClick={this.onImageClick2}
                files={ddDocuments}
                onChange={this.onFileChange4.bind(this)}
              />
            </View>

            <AtList>
              <View className="at-row">
                <View className="at-col">
                  <Picker
                    mode="selector"
                    range={this.state.selectorTomorrowWeather}
                    onChange={this.onChangeTomorrow}
                  >
                    <AtList>
                      <AtListItem
                        title="明日天气"
                        extraText={this.state.tomorrowWeather}
                      />
                    </AtList>
                  </Picker>
                </View>
              </View>
            </AtList>

            <AtList>
              <View className="at-row">
                <View className="at-col">
                  <AtInput
                    border={false}
                    title="明日进场材料"
                    name="tomorrowMaterial"
                    type="text"
                    placeholder="请输入"
                    value={this.state.tomorrowMaterial}
                    onChange={this.handleChangeTomorrowMaterial}
                  />
                </View>
              </View>
            </AtList>

            <View
              className="vc"
              style={{ marginTop: '30rpx', marginBottom: '15rpx' }}
            >
              <Text style={{ fontSize: '32rpx', paddingLeft: '24rpx' }}>
                风险与协助
              </Text>
              <View></View>
            </View>
            <View>
              <AtTextarea
                value={this.state.assistance}
                onChange={this.handleChangeAssistance}
                placeholder="施工总结"
              />
            </View>

            <View
              style={{
                marginTop: '30rpx',
                marginBottom: '15rpx',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: '32rpx', paddingLeft: '24rpx' }}>
                施工总结
              </Text>
              <View>
                <AtSwitch
                  border={false}
                  className="at-switch"
                  color="#1abc9c"
                  checked={summaryShare === 1 ? true : false}
                  onChange={this.handleSwitchChange}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: '28rpx',
                    paddingLeft: '12rpx',
                    color: '#228B22',
                  }}
                >
                  邮件自动发送外部客户(默认不发)
                </Text>
              </View>
            </View>
            <View>
              <AtTextarea
                value={this.state.summary}
                onChange={this.handleChangeSummary}
                placeholder="施工总结"
              />
            </View>

            <View
              className="vc"
              style={{ marginTop: '30rpx', marginBottom: '15rpx' }}
            >
              <Text style={{ fontSize: '32rpx', paddingLeft: '24rpx' }}>
                备注
              </Text>
              <View></View>
            </View>
            <View>
              <AtTextarea
                value={this.state.contentRemarks}
                onChange={this.handleChangeContentRemarks}
                placeholder="备注"
              />
            </View>
          </AtForm>
        </View>
        <View>
          <AtButton
            type="primary"
            onClick={e => {
              this.submitPublish(e)
            }}
            formType="submit"
          >
            提交
          </AtButton>
        </View>
        <AtFloatLayout
          onClose={() => {
            this.setState({
              drawerVisible: false,
            })
          }}
          isOpened={drawerVisible}
        >
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: '90%' }}>
              <AtInput
                name="positionInpu"
                type="text"
                placeholder="手动输入内容"
                value={productCategoryValue}
                onChange={value => {
                  this.handleChangeProductCategory(value)
                }}
              />
            </View>
            <View onClick={this.handleSetCategory}>
              <AtIcon value="check" size="20" color="#70bb48"></AtIcon>
            </View>
          </View>
          <View>
            <AtList>
              {productCategoryList.map((item: any, index: number) => {
                return (
                  <AtListItem
                    onClick={() => {
                      this.handleSetCategory2(item)
                    }}
                    key={index}
                    title={item.name}
                  />
                )
              })}
            </AtList>
          </View>
        </AtFloatLayout>
        <AtFloatLayout
          onClose={() => {
            this.setState({
              drawerVisible2: false,
            })
          }}
          isOpened={drawerVisible2}
        >
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: '90%' }}>
              <AtInput
                name="positionCagetoryInput"
                type="text"
                placeholder="手动输入内容"
                value={productCategoryValue}
                onChange={value => {
                  this.handleChangeProductCategory(value)
                }}
              />
            </View>
            <View onClick={this.handleSetCategoryCol2}>
              <AtIcon value="check" size="20" color="#70bb48"></AtIcon>
            </View>
          </View>
          <View>
            <AtList>
              {productCategoryList2.map((item: any, index: number) => {
                return (
                  <AtListItem
                    onClick={() => {
                      this.handleSetCategory3(item)
                    }}
                    key={index}
                    title={item.productDetail}
                  />
                )
              })}
            </AtList>
          </View>
        </AtFloatLayout>
        <AtFloatLayout
          onClose={() => {
            this.setState({
              drawerVisible3: false,
            })
          }}
          isOpened={drawerVisible3}
        >
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: '90%' }}>
              <AtInput
                name="progressValueInput"
                type="text"
                placeholder="手动输入内容"
                value={progressValue}
                onChange={this.handleChangeProgress}
              />
            </View>
            <View onClick={this.handleSetProgress}>
              <AtIcon value="check" size="20" color="#70bb48"></AtIcon>
            </View>
          </View>
        </AtFloatLayout>
        <AtMessage />
      </View>
    )
  }
}

export default DailyEdit
