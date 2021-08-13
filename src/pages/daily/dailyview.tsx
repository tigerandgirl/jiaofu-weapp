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

import './style.styl'

type PageStateProps = {
  dispatch: Function
  asyncData: any
}
type PageDispatchProps = {
  getAsyncData: () => void
  initAsyncData: () => void
}
type IProps = PageStateProps & PageDispatchProps

interface DailyView {
  props: IProps
}

@connect(
  state => ({
    asyncData: state.data.asyncData,
  }),
  dispatch => ({
    getAsyncData(): void {
      dispatch({
        type: 'data/fetch',
      })
    },
    initAsyncData(): void {
      dispatch({
        type: 'data/init',
      })
    },
  })
)
class DailyView extends Component {
  state = {
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
  render() {
    const { asyncData } = this.props
    const dataSource = [
      {
        house: '办公楼',
        workTask: '框架安装',
        planProgress: '100%',
        actualProgress: '90%',
      },
      {
        house: '办公楼',
        workTask: '框架安装',
        planProgress: '100%',
        actualProgress: '90%',
      },
    ]

    const columns = [
      {
        title: '楼栋',
        dataIndex: 'house',
      },

      {
        title: '施工任务',
        dataIndex: 'workTask',
      },

      {
        title: '计划进度',
        dataIndex: 'planProgress',
      },

      {
        title: '实际进度',
        dataIndex: 'actualProgress',
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
              value={''}
              onChange={this.handleChange.bind(this, 'value')}
            />
          </View>
          <View className="two-col">
            <Picker mode="date" onChange={this.onDateChange}>
              <AtList>
                <AtListItem title="日期" extraText={this.state.dateSel} />
              </AtList>
            </Picker>
            <Picker
              mode="selector"
              range={this.state.selector}
              onChange={this.onChange}
            >
              <AtList>
                <AtListItem
                  title="进度"
                  extraText={this.state.selectorChecked}
                />
              </AtList>
            </Picker>
          </View>

          <View className="two-col">
            <Picker
              mode="selector"
              range={this.state.selectorWeather}
              onChange={this.onChange}
            >
              <AtList>
                <AtListItem
                  title="今日天气"
                  extraText={this.state.selectorWeatherChecked}
                />
              </AtList>
            </Picker>
            <View className="vc">
              <Text className="title">工人</Text>
              <AtInputNumber
                min={0}
                max={10}
                step={1}
                value={this.state.workerNum}
                onChange={this.handleChange.bind(this)}
              />
            </View>
          </View>

          <View className="two-col">
            <Picker mode="date" onChange={this.onDateChange}>
              <AtList>
                <AtListItem
                  title="计划完成时间"
                  extraText={this.state.dateSel}
                />
              </AtList>
            </Picker>
            <AtInput
              title="倒计时"
              name="value"
              type="text"
              placeholder=""
              value={''}
              onChange={this.handleChange.bind(this)}
            />
          </View>

          <View className="two-col">
            <AtInput
              title="到场材料"
              name="value"
              type="number"
              placeholder=""
              value={''}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              title="配送进展"
              name="value"
              type="text"
              placeholder=""
              value={''}
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
                  extraText={this.state.selectorWeatherChecked}
                />
              </AtList>
            </Picker>
          </View>

          <View className="vc">
            <Text>今日施工内容：</Text>
            <View>
              <Text className="title2">添加内容</Text>
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
              dataSource={dataSource}
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
              dataSource={dataSource}
              // ...你的配置
            />
          </View>

          <View>
            <Text>现场照片/视频</Text>
          </View>
          <View>
            <AtImagePicker
              showAddBtn={false}
              onImageClick={this.onImageClick}
              files={this.state.files}
              onChange={this.onImgChange.bind(this)}
            />
          </View>

          <View>
            <Text>定点照片</Text>
          </View>
          <View>
            <AtImagePicker
              showAddBtn={false}
              onImageClick={this.onImageClick}
              files={this.state.files}
              onChange={this.onImgChange.bind(this)}
            />
          </View>

          <View className="vc">
            <Picker
              mode="selector"
              range={this.state.selectorWeather}
              onChange={this.onChange}
            >
              <AtList>
                <AtListItem
                  title="明日天气"
                  extraText={this.state.selectorWeatherChecked}
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
                  extraText={this.state.selectorWeatherChecked}
                />
              </AtList>
            </Picker>
          </View>

          <View>
            <AtInput
              name="value"
              title="风险与协助"
              type="text"
              placeholder="标题"
              value={''}
              onChange={this.handleChange.bind(this, 'value')}
            />
          </View>
          <View>
            <Text>施工总结</Text>
            <AtTextarea
              value={''}
              onChange={this.handleChange.bind(this)}
              maxLength={200}
              placeholder="施工总结"
            />
          </View>
          <View>
            <Text>备注</Text>
            <AtTextarea
              value={''}
              onChange={this.handleChange.bind(this)}
              maxLength={200}
              placeholder="备注"
            />
          </View>

          <AtButton formType="submit">提交</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default DailyView
