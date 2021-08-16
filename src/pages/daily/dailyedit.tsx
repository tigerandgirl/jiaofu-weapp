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
} from 'taro-ui'
import Table from 'taro3-table'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import './style.styl'

type PageStateProps = {
  dispatch: Function
  daily: any
}
type IProps = PageStateProps

interface DailyEdit {
  props: IProps
}

const dateFormat = 'YYYY-MM-DD'

@connect(
  state => ({
    daily: state.daily,
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
    files: [
      {
        url:
          'https://xinlj.oss-cn-beijing.aliyuncs.com/20210811/rc-upload-1628689757650-5/刺客信条：奥德赛2020-5-5-0-6-37.jpg',
      },
      {
        url:
          'https://xinlj.oss-cn-beijing.aliyuncs.com/20210811/rc-upload-1628689757650-7/刺客信条：奥德赛2020-5-5-0-6-39.jpg',
      },
    ],
    projectName: '',
    todayContents: [],
    tommrowContents: [],
  }

  componentWillMount() {
    const { daily } = this.props
    const { projectDetail } = daily
    this.setState({
      projectName: !!projectDetail['name'] ? projectDetail['name'] : '',
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

  onImgChange(files) {
    this.setState({
      files,
    })
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick = (index, file) => {
    console.log(index, file)
    Taro.previewImage({
      current: file.url,
      urls: this.state.files.map(item => {
        return item.url
      }),
    })
  }

  onSubmit(event) {
    console.log()
  }
  onReset(event) {}

  addTodayContent = () => {
    const { todayContents } = this.state
    // let keyIndex = todayContents.length+1
    let newData = {
      id: '',
      position: '',
      productCategory: '',
      productDetail: '',
      specifications: '',
      unit: '',
      palnProgress: 0,
      actualProgress: 0,
    }

    this.setState({
      todayContents: Object.assign([], todayContents, [newData]),
    })
  }

  removeTodayConent = () => {}

  addTommrowContent = () => {}

  removeTommrowConent = () => {}

  submitPublish = e => {
    e.preventDefault()
    const { daily, dispatch } = this.props
    const { projectDetail } = daily
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
    } = this.state

    let newDaily = Object.assign(
      {},
      {
        weather: weather,
        tomorrowWeather: tomorrowWeather,
        progressState: parseInt(progressState),
        workersCount: workersCount,
        countdownDay: countdownDay,
        arrivalMaterialText: arrivalMaterialText,
        material: material,
        tomorrowMaterial: tomorrowMaterial,
        distributionJson: distributionJson,
        // "dailyDocuments":newDailyDocuments,
        title: date + ' 日报',
        date: moment(date).valueOf(),
        planOverTime: moment(planOverTime).valueOf(),
        projectId: projectDetail.id,
        summary: summary,
        assistance: assistance,
        contentRemarks: contentRemarks,
      }
    )
    console.log(newDaily)
    dispatch({
      type: 'daily/getDailyById',
      payload: { d: newDaily },
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
    const { projectName, todayConents, tommrowContents } = this.state
    const { daily } = this.props
    const { projectDetail } = daily

    const columns = [
      {
        title: '楼栋',
        dataIndex: 'position',
        render: t => {
          return (
            <AtInput name="house" placeholder="请输入" type="text" value={''} />
          )
        },
      },

      {
        title: '施工任务',
        dataIndex: 'productDetail',
        render: t => {
          return (
            <AtInput name="house" placeholder="请输入" type="text" value={''} />
          )
        },
      },

      {
        title: '计划进度',
        dataIndex: 'palnProgress',
        render: t => {
          return (
            <AtInput name="house" placeholder="请输入" type="text" value={''} />
          )
        },
      },

      {
        title: '实际进度',
        dataIndex: 'actualProgress',
        render: t => {
          return (
            <AtInput name="house" placeholder="请输入" type="text" value={''} />
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
                value={this.state.arrivalMaterialText}
                onChange={this.handleChangeDCCL}
              />
              <Text>%</Text>
            </View>
            <AtInput
              title="配送进展"
              name="value"
              type="text"
              placeholder="请输入"
              value={this.state.distributionJson}
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

          {/* <View className="vc" style={{marginTop:'30rpx'}}>
            <Text>今日施工内容：</Text>
            <View onClick={this.addTodayContent}>
              <Text  className="title2">添加内容</Text>
              <Text className="title2 ml">删除末行</Text>
            </View>
          </View>
          <View style={{ display: 'flex', justifyContent: 'center' }}>
            <Table
              style={{
                width: '100vw',
              }}
              colStyle={{ padding: '5px 5px' }}
              columns={columns}
              dataSource={todayConents}
              // ...你的配置
            />
          </View>

          <View className="vc">
            <Text>明日施工计划：</Text>
            <View>
              <Text className="title2">更新</Text>
              <Text className="title2  ml">添加内容</Text>
              <Text className="title2 ml">删除末行</Text>
            </View>
          </View>
          <View style={{ display: 'flex', justifyContent: 'center' }}>
            <Table
              style={{
                width: '100vw',
              }}
              colStyle={{ padding: '5px 5px' }}
              columns={columns}
              dataSource={tommrowContents}
              // ...你的配置
            />
          </View> */}

          {/* <View>
            <Text>现场照片/视频</Text>
          </View>
          <View>
            <AtImagePicker
              onImageClick={this.onImageClick}
              files={this.state.files}
              onChange={this.onImgChange.bind(this)}
            />
          </View>

          <View>
            <Text>上传定点照片</Text>
          </View>
          <View>
            <AtImagePicker
              onImageClick={this.onImageClick}
              files={this.state.files}
              onChange={this.onImgChange.bind(this)}
            />
          </View> */}

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
      </View>
    )
  }
}

export default DailyEdit
