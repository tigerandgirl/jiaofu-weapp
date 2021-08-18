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
} from 'taro-ui'
import Table from 'taro3-table'
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
    ddDocuments: [], // 定点照片临时存储
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
    productCategoryList: [],
    productCategoryList2: [],
    productCategoryValue: '',
    todayOrTomorrow: 1, //1:today,2:tomorrow
  }

  componentWillMount() {
    const { project } = this.props
    const { projectDetail } = project
    this.setState({
      projectName: !!projectDetail['name'] ? projectDetail['name'] : '',
    })

    this.getDailyInfo()
    this.getProductCategoryList()
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
      selectorChecked: this.state.selector[e.detail.value],
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

  // 上传
  onFileChange2(v, doType, index) {
    // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    const { dailyDocuments } = this.state
    if (doType === 'remove') {
      this.setState(() => {
        return {
          files: v,
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
            files: v,
          }
        },
        () => {
          let that = this
          // 已经上传的
          const oldArray = dailyDocuments.map(item => {
            return item.fileId
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

  // 上传
  onFileChangeDD(v, doType, index) {
    // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    const { ddDocuments } = this.state
    if (doType === 'remove') {
      this.setState(() => {
        return {
          files2: v,
        }
      })
      this.setState({
        ddDocuments: Object.assign([], v),
      })
    } else {
      // 多张上传时，先去掉已经上传的图片，再上传新的图片

      // 新增
      this.setState(
        () => {
          return {
            files2: v,
          }
        },
        () => {
          let that = this
          // 已经上传的
          const oldArray = ddDocuments.map(item => {
            return item.fileId
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
                  ddDocuments: Object.assign(attachments),
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

  handleEditTc = (type, value, record) => {
    const { todayContents } = this.state
    let newList = Object.assign(todayContents)
    newList = newList.map((item: any, index: number) => {
      if (record['key'] === index) {
        let obj = {}
        obj[type] = value
        item = Object.assign(item, obj)
      }
      return item
    })

    this.setState({
      todayContents: newList,
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
    // this.setState({
    //   dataSource2:
    //     field.distributionJson == null || field.distributionJson == ''
    //       ? [{ first: '', last: '' }]
    //       : JSON.parse(field.distributionJson),
    // })
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
          this.setState({
            dailyDetail: Object.assign(field, {
              dailyProjectPhotos: res.dailyProjectPhotos,
            }),
          })
        }
        this.setState({
          daily: Object.assign({}, res, {
            arrivalCount: res.arrivalCount == -1 ? null : field.arrivalCount,
            installCount: res.installCount == -1 ? null : field.installCount,
            onWayCount: res.onWayCount == -1 ? null : field.onWayCount,
          }),
        })
      }
    })

    this.setCurrentDailyDetail(field)
  }

  setCurrentDailyDetail = dd => {
    let title = ''
    if (!!dd.id) {
      this.setState({
        workersCount: dd.workersCount,
      })
      title = '日报编辑'
    } else {
      title = '日报填写'
    }
    Taro.setNavigationBarTitle({
      title: title,
    })
  }

  handleChangeProductCategory = value => {
    this.setState({
      productCategoryValue: value,
    })
  }

  submitPublish = e => {
    e.preventDefault()
    const { project, daily, dispatch } = this.props
    const { projectDetail } = project
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
      contentRemarks,
      dailyDocuments,
      todayContents,
      tomorrowContents,
    } = this.state

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
        progressState: parseInt(progressState),
        workersCount: workersCount,
        countdownDay: countdownDay,
        arrivalMaterialText: arrivalMaterialText,
        material: material,
        tomorrowMaterial: tomorrowMaterial,
        distributionJson: distributionJson,
        dailyDocuments: newDailyDocuments.map((item, index) => {
          return Object.assign(item, {
            name: this.genDailyDocmentName(item, index),
            orders: index + 1,
          })
        }),
        title: date + ' 日报',
        date: moment(date).valueOf(),
        planOverTime: moment(planOverTime).valueOf(),
        projectId: projectDetail.id,
        summary: summary,
        assistance: assistance,
        contentRemarks: contentRemarks,
      }
    )
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

  render() {
    const {
      projectName,
      todayContents,
      tomorrowContents,
      drawerVisible,
      drawerVisible2,
      productCategoryList,
      productCategoryList2,
      productCategoryValue,
      distributionJson,
      arrivalMaterialText,
    } = this.state
    const { project } = this.props
    const { projectDetail } = project

    const columns: any = [
      {
        title: '楼栋',
        dataIndex: 'position',
        render: (text, record) => {
          return (
            <View
              onClick={() => {
                this.setState({ todayOrTomorrow: 1 })
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
                this.setState({ todayOrTomorrow: 1 })
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
            <AtInput
              onBlur={value => {
                this.handleEditTodayContent({ palnProgress: value }, record)
              }}
              name="palnProgress"
              placeholder="请输入"
              type="text"
              value={text}
            />
          )
        },
      },

      {
        title: '实际进度',
        dataIndex: 'actualProgress',
        render: (text, record) => {
          return (
            <AtInput
              onBlur={value => {
                this.handleEditTodayContent({ actualProgress: value }, record)
              }}
              name="palnProgress"
              placeholder="请输入"
              type="text"
              value={text}
            />
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
                this.setState({ todayOrTomorrow: 2 })
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
                this.setState({ todayOrTomorrow: 2 })
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
            <AtInput
              onBlur={value => {
                this.handleEditTomorrowContent({ palnProgress: value }, record)
              }}
              name="palnProgress"
              placeholder="请输入"
              type="text"
              value={text}
            />
          )
        },
      },

      {
        title: '实际进度',
        dataIndex: 'actualProgress',
        render: (text, record) => {
          return (
            <AtInput
              onBlur={value => {
                this.handleEditTomorrowContent(
                  { actualProgress: value },
                  record
                )
              }}
              name="palnProgress"
              placeholder="请输入"
              type="text"
              value={text}
            />
          )
        },
      },
    ]

    return (
      <View className="daily-edit">
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <View>
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
          <View className="two-col">
            <Picker mode="date" onChange={this.onDateChange}>
              <AtList>
                <AtListItem title="日期" extraText={this.state.date} />
              </AtList>
            </Picker>
            <Picker
              mode="selector"
              range={this.state.selector}
              onChange={this.onChange}
            >
              <AtList>
                <AtListItem title="进度" extraText={this.state.progressState} />
              </AtList>
            </Picker>
          </View>

          <View className="two-col">
            <Picker
              mode="selector"
              range={this.state.selectorWeather}
              onChange={this.onChangeTodayWeather}
            >
              <AtList>
                <AtListItem title="今日天气" extraText={this.state.weather} />
              </AtList>
            </Picker>
            <View className="vc">
              <Text className="title">工人</Text>
              <AtInputNumber
                min={0}
                step={1}
                value={this.state.workersCount}
                onChange={this.handleChangeWorkersCount}
              />
            </View>
          </View>

          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Picker mode="date" onChange={this.onPlanOverTimeChange}>
              <AtList>
                <AtListItem
                  title="计划完成时间"
                  extraText={this.state.planOverTime}
                />
              </AtList>
            </Picker>
            <Text>倒计时</Text>
            <AtInputNumber
              min={0}
              step={1}
              value={this.state.countdownDay}
              onChange={this.handleChangeCountDownDay}
            />
          </View>

          <View className="two-col">
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <AtInput
                title="到场材料"
                name="arrivalMaterialText"
                type="number"
                placeholder="请输入"
                value={arrivalMaterialText}
                onChange={this.handleChangeDCCL}
              />
              <Text>%</Text>
            </View>
            <AtInput
              title="配送进展"
              name="distributionJson"
              type="text"
              placeholder="请输入"
              value={distributionJson}
              onChange={this.handleChangePSJZ}
            />
          </View>

          <View>
            <AtInput
              title="进场材料"
              name="material"
              type="text"
              placeholder="请输入"
              value={this.state.material}
              onChange={this.handleChangeMaterial}
            />
          </View>

          <View className="vc" style={{ marginTop: '30rpx' }}>
            <Text>今日施工内容：</Text>
            <View className="vc">
              <AtButton
                onClick={this.addTodayContent}
                type="secondary"
                size="small"
              >
                添加内容
              </AtButton>
              <AtButton
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
              onChange={v => {
                // console.log('onChange -', v)
              }}
              style={{
                width: '100vw',
              }}
              colStyle={{ padding: '5px 5px' }}
              rowKey="key"
              columns={columns}
              dataSource={todayContents}
            />
          </View>

          <View className="vc">
            <Text>明日施工计划：</Text>
            <View className="vc">
              <AtButton
                onClick={this.addTomorrowContent}
                type="secondary"
                size="small"
              >
                添加内容
              </AtButton>
              <AtButton
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
              onChange={v => {
                // console.log('onChange -', v)
              }}
              style={{
                width: '100vw',
              }}
              colStyle={{ padding: '5px 5px' }}
              rowKey="key"
              columns={columns2}
              dataSource={tomorrowContents}
            />
          </View>

          <View>
            <Text>现场照片/视频</Text>
          </View>
          <View>
            <AtImagePicker
              multiple={true}
              onImageClick={this.onImageClick1}
              files={this.state.dailyDocuments}
              onChange={this.onFileChange2.bind(this)}
            />
          </View>

          <View>
            <Text>上传定点照片</Text>
          </View>
          <View>
            <AtImagePicker
              length={4}
              onImageClick={this.onImageClick2}
              files={this.state.files2}
              onChange={this.onFileChangeDD.bind(this)}
            />
          </View>

          <View>
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

          <View>
            <AtInput
              title="明日进场材料"
              name="tomorrowMaterial"
              type="text"
              placeholder="请输入"
              value={this.state.tomorrowMaterial}
              onChange={this.handleChangeTomorrowMaterial}
            />
          </View>

          <View>
            <AtInput
              name="assistance"
              title="风险与协助"
              type="text"
              placeholder="请输入"
              value={this.state.assistance}
              onChange={this.handleChangeAssistance}
            />
          </View>
          <View>
            <Text>施工总结</Text>
            <AtTextarea
              value={this.state.summary}
              onChange={this.handleChangeSummary}
              placeholder="施工总结"
            />
          </View>
          <View>
            <Text>备注</Text>
            <AtTextarea
              value={this.state.contentRemarks}
              onChange={this.handleChangeContentRemarks}
              placeholder="备注"
            />
          </View>

          <AtButton
            onClick={e => {
              this.submitPublish(e)
            }}
            formType="submit"
          >
            提交
          </AtButton>
        </AtForm>
        <AtFloatLayout isOpened={drawerVisible}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: '90%' }}>
              <AtInput
                name="value"
                type="text"
                placeholder="手动输入内容"
                value={productCategoryValue}
                onChange={this.handleChangeProductCategory}
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
        <AtFloatLayout isOpened={drawerVisible2}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: '90%' }}>
              <AtInput
                name="value"
                type="text"
                placeholder="手动输入内容"
                value={productCategoryValue}
                onChange={this.handleChangeProductCategory}
              />
            </View>
            <View onClick={this.handleSetCategory}>
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
      </View>
    )
  }
}

export default DailyEdit
