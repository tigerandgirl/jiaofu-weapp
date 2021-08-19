/*
 * @Author: qiufh
 * @Date: 2020-09-14 19:44:38
 * @Last Modified by: qiufh
 * @Last Modified time: 2020-09-17 18:12:39
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Picker, Text, RichText } from '@tarojs/components'
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
import moment from 'moment'
import isArray from 'lodash/isArray'
import { v4 as uuidv4 } from 'uuid'

import videopng from '../../assets/images/video.png'

import './style.styl'

type PageStateProps = {
  dispatch: Function
  daily: any
  project: any
}

type IProps = PageStateProps

interface DailyView {
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
class DailyView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateSel: '2018-04-22',
      selector: ['正常', '延期', '提前'],
      selectorChecked: '正常',
      selectorWeather: ['晴', '雨', '雪', '大风', '雾'],
      selectorWeatherChecked: '晴',
      workerNum: 0,
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
    }
  }

  componentDidMount() {
    const { project, daily } = this.props
    const { projectDetail } = project
    const { dailyDetail } = daily
    Taro.setNavigationBarTitle({
      title: projectDetail.name,
    })
  }

  handleChange(value) {
    this.setState({
      value,
    })
  }
  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
    })
  }
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value,
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
    const { daily } = this.props
    const { dailyDetail } = daily
    Taro.previewImage({
      current: file.url,
      urls: dailyDetail.dailyDocuments.map(item => {
        return item.fileUrl
      }),
    })
  }

  onImage2Click = (index, file) => {
    const { daily } = this.props
    const { dailyDetail } = daily
    let dds: any = []

    if (
      !!dailyDetail.dailyProjectPhotos &&
      isArray(dailyDetail.dailyProjectPhotos)
    ) {
      dds = dailyDetail.dailyProjectPhotos
        .map((item, index) => {
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
    Taro.previewImage({
      current: file.url,
      urls: dds.map(item => {
        return item.url
      }),
    })
  }

  onSubmit(event) {
    console.log()
  }
  onReset(event) {}

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

  showDailyDocumnet = () => {
    const { daily } = this.props
    const { dailyDetail } = daily

    let dds: any = []

    //获取后缀
    // function getExt(filePath) {
    // 	// 去掉url的问号
    // 	if (filePath.indexOf("?") !=-1) {
    // 		filePath = filePath.split("?")[0];
    // 	}
    // 	//获取最后一个.的位置
    // 	let index = filePath.lastIndexOf(".");
    // 	//获取后缀
    // 	let ext = filePath.substr(index + 1);
    // 	return ext;
    // }

    if (!!dailyDetail.dailyDocuments && isArray(dailyDetail.dailyDocuments)) {
      // dailyDocuments = dds.map((item, index)=>{
      //   if(item){
      //     // let isVideo = /(avi|dat|mpg|wmv|asf|rm|rmvb|mov|flv|mp4|3gp|dv|divx|qt|asx)$/.test(getExt(item.fileUrl))
      // 		return Object.assign({}, {
      // 			"fileId":null,
      // 			"fileName":item.fileUrl,
      // 			"filePath":item.fileUrl,
      // 			"id":"",
      // 			"name":item.name,
      // 			"status":"done",
      // 			"uid":uuidv4(),
      // 			"url": item.fileUrl
      // 		})
      //   }
      // })

      dds = dailyDetail.dailyDocuments
        .map((item, index) => {
          return Object.assign({}, { url: item.fileUrl, key: index })
        })
        .filter(item => {
          return item.url !== null
        })
    }

    return dds
  }

  showDailyProjectPhotos = () => {
    const { daily } = this.props
    const { dailyDetail } = daily

    let dds: any = []

    if (
      !!dailyDetail.dailyProjectPhotos &&
      isArray(dailyDetail.dailyProjectPhotos)
    ) {
      dds = dailyDetail.dailyProjectPhotos
        .map((item, index) => {
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

  getDailyDetail = () => {
    Taro.navigateTo({
      url: '/pages/daily/dailyedit',
    })
  }

  render() {
    const { daily } = this.props
    const { dailyDetail } = daily

    const columns = [
      {
        title: '楼栋',
        dataIndex: 'position',
      },

      {
        title: '施工任务',
        dataIndex: 'productDetail',
      },

      {
        title: '计划进度',
        dataIndex: 'palnProgress',
      },

      {
        title: '实际进度',
        dataIndex: 'actualProgress',
      },
    ]

    return (
      <View>
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
                value={dailyDetail.title}
                onChange={this.handleChange.bind(this, 'value')}
              />
            </View>
            <View className="two-col">
              <Picker disabled={true} mode="date" onChange={this.onDateChange}>
                <AtList>
                  <AtListItem
                    title="日期"
                    extraText={moment(dailyDetail.date).format(dateFormat)}
                  />
                </AtList>
              </Picker>
              <Picker
                mode="selector"
                range={this.state.selector}
                onChange={this.onChange}
                disabled={true}
              >
                <AtList>
                  <AtListItem
                    title="进度"
                    extraText={this.getProgressStateInfo(
                      dailyDetail.progressState
                    )}
                  />
                </AtList>
              </Picker>
            </View>

            <View className="two-col">
              <Picker
                mode="selector"
                range={this.state.selectorWeather}
                onChange={this.onChange}
                disabled={true}
              >
                <AtList>
                  <AtListItem
                    title="今日天气"
                    extraText={
                      dailyDetail.weather == null ? '' : dailyDetail.weather
                    }
                  />
                </AtList>
              </Picker>
              <View className="vc">
                <Text className="title">工人</Text>
                <Text className="title">{dailyDetail.workersCount} 人</Text>
              </View>
            </View>

            <View className="two-col vc">
              <Picker mode="date" onChange={this.onDateChange}>
                <AtList>
                  <AtListItem
                    title="计划完成时间"
                    extraText={moment(dailyDetail.planOverTime).format(
                      dateFormat
                    )}
                  />
                </AtList>
              </Picker>
              <Text>
                倒计时{' '}
                {!!dailyDetail.countdownDay
                  ? dailyDetail.countdownDay + ' 天'
                  : ' '}
              </Text>
            </View>

            <View className="two-col">
              <AtInput
                disabled={true}
                title="到场材料"
                name="value"
                type="number"
                placeholder=""
                value={
                  !!dailyDetail.arrivalMaterialText
                    ? dailyDetail.arrivalMaterialText
                    : '0' + '%'
                }
                onChange={this.handleChange.bind(this)}
              />
              <AtInput
                disabled={true}
                title="配送进展"
                name="value"
                type="text"
                placeholder=""
                value={dailyDetail.distributionJson}
                onChange={this.handleChange.bind(this)}
              />
            </View>

            <View>
              <Picker
                mode="selector"
                range={this.state.selectorWeather}
                onChange={this.onChange}
              >
                <AtList>
                  <AtListItem
                    title="进场材料"
                    extraText={
                      !!dailyDetail.arrivalMaterial
                        ? dailyDetail.arrivalMaterial
                        : ''
                    }
                  />
                </AtList>
              </Picker>
            </View>

            <View className="vc">
              <Text>今日施工内容：</Text>
              <View></View>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center' }}>
              <Table
                style={{
                  width: '100vw',
                }}
                colStyle={{ padding: '5px 5px' }}
                columns={columns}
                dataSource={dailyDetail.contents}
                rowKey="id"
              />
            </View>

            <View className="vc">
              <Text>明日施工计划：</Text>
              <View></View>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center' }}>
              <Table
                style={{
                  width: '100vw',
                }}
                colStyle={{ padding: '5px 5px' }}
                columns={columns}
                dataSource={dailyDetail.tomorrowContents}
                rowKey="id"
              />
            </View>

            <View>
              <Text>现场照片</Text>
            </View>
            <View>
              <AtImagePicker
                showAddBtn={false}
                className="attachment-readonly"
                onImageClick={this.onImageClick}
                files={this.showDailyDocumnet()}
                onChange={() => {}}
              />
            </View>

            <View>
              <Text>定点照片</Text>
            </View>
            <View>
              <AtImagePicker
                showAddBtn={false}
                className="attachment-readonly"
                onImageClick={this.onImage2Click}
                files={this.showDailyProjectPhotos()}
                onChange={this.onImgChange.bind(this)}
              />
            </View>

            <View className="vc">
              <Picker
                disabled={true}
                mode="selector"
                range={this.state.selectorWeather}
                onChange={this.onChange}
              >
                <AtList>
                  <AtListItem
                    title="明日天气"
                    extraText={
                      !!dailyDetail.tomorrowWeather
                        ? dailyDetail.tomorrowWeather
                        : ''
                    }
                  />
                </AtList>
              </Picker>
            </View>

            <View>
              <Picker
                mode="selector"
                range={this.state.selectorWeather}
                onChange={this.onChange}
              >
                <AtList>
                  <AtListItem
                    title="明日进场材料"
                    extraText={
                      !!dailyDetail.tomorrowEnterMaterial
                        ? dailyDetail.tomorrowEnterMaterial
                        : ''
                    }
                  />
                </AtList>
              </Picker>
            </View>

            <View className="one-col">
              <Text>风险与协助:</Text>
              <RichText
                className="sum_content"
                nodes={
                  dailyDetail.assistance !== null ? dailyDetail.assistance : ''
                }
              />
            </View>
            <View>
              <Text>施工总结</Text>
              <RichText
                className="sum_content"
                nodes={dailyDetail.summary !== null ? dailyDetail.summary : ''}
              />
            </View>
            <View>
              <Text>备注</Text>
              <RichText
                className="sum_content"
                nodes={
                  dailyDetail.contentRemarks !== null
                    ? dailyDetail.contentRemarks
                    : ''
                }
              />
            </View>
          </AtForm>
        </View>
        <View>
          <AtButton
            onClick={this.getDailyDetail}
            className="edit-button"
            full
            type="primary"
          >
            编辑
          </AtButton>
        </View>
      </View>
    )
  }
}

export default DailyView
