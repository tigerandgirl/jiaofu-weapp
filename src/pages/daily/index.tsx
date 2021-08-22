/*
 * @Author: qiufh
 * @Date: 2020-09-14 19:44:38
 * @Last Modified by: qiufh
 * @Last Modified time: 2020-09-17 18:12:39
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtCard } from 'taro-ui'
import moment from 'moment'
import { TaroVirtualList } from 'taro-virtual-list'

import u1366 from '../../assets/images/u1366.png'
import notfund from '../../assets/images/notfund.png'

import './style.styl'

type PageStateProps = {
  dispatch: Function
  daily: any
}

type IProps = PageStateProps

interface Index {
  props: IProps
}

@connect(
  state => ({
    daily: state.daily,
  }),
  dispatch => ({
    dispatch,
  })
)
class Index extends Component {
  constructor(props) {
    super(props)
  }

  getTodayContentInfo = item => {
    if (item.contents.length >= 2) {
      return `${item.contents[0]['position']}${
        !!item.contents[0]['productCategory']
          ? item.contents[0]['productCategory']
          : ''
      }完成${item.contents[0]['actualProgress']}%，${
        item.contents[1]['position']
      }${
        !!item.contents[1]['productCategory']
          ? item.contents[1]['productCategory']
          : ''
      }完成${item.contents[1]['actualProgress']}%`
    }
    if (item.contents.length > 0) {
      return `${item.contents[0]['position']}${
        !!item.contents[0]['productCategory']
          ? item.contents[0]['productCategory']
          : ''
      }完成${item.contents[0]['actualProgress']}%`
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

  getProgressStateColor = state => {
    let info = ''
    if (state === 0) {
      info = '#32cd32'
    }
    if (state === 1) {
      info = '#4169e1'
    }
    if (state === 2) {
      info = '#f59a23'
    }
    return info
  }

  getDailyById = params => {
    const { dispatch } = this.props
    dispatch({
      type: 'daily/getDailyById',
      payload: params,
    })
    Taro.navigateTo({
      url: '/pages/daily/dailyview',
    })
  }

  renderFunc = (item, index, pageIndex) => {
    return (
      <View key={index} className="daily-list">
        <View
          className="daily-item"
          onClick={() => {
            this.getDailyById({ id: item.id })
          }}
        >
          <View className="daily-up">
            {item.dailyDocuments.length > 0 &&
            item.dailyDocuments[0]['fileUrl'] !== null ? (
              <Image
                className="home_img"
                style="width: 130px;min-width:130px;height: 80px"
                src={item.dailyDocuments[0]['fileUrl']}
              />
            ) : (
              <Image
                className="home_img"
                style="width: 130px;min-width:130px;height: 80px"
                src={u1366}
              />
            )}
            <View className="daily-desc" style={{ width: '100%' }}>
              <View className="daily-title">
                <Text>{item.title}</Text>
              </View>
              <View className="daily-sub">
                <Text>{this.getTodayContentInfo(item)}</Text>
              </View>
            </View>
          </View>
          <View className="daily-down">
            <Text className="daily-author-date">
              {item.createUserName === null ? '' : item.createUserName}{' '}
              {item.createTime !== 0
                ? moment(item.createTime).format('YYYY.MM.DD HH:mm:ss')
                : ''}
            </Text>
            <View
              style={{
                fontFamily: '',
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: '12px',
                color: '#333',
              }}
            >
              <Text style={{ color: '#333' }}>进度: </Text>
              <Text
                style={{
                  color: this.getProgressStateColor(item.progressState),
                }}
              >
                {this.getProgressStateInfo(item.progressState)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  handleBottom = () => {
    console.log('触底了')
  }

  handleComplete = () => {
    console.log('加载完成')
  }

  goToEditDaily = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'daily/updateState',
      payload: {
        dailyDetail: {
          id: null,
          date: null,
          title: null,
          progressState: null,
          weather: null,
          windPower: null,
          overallDescription: null,
          contentRemarks: null,
          workersCount: null,
          material: null,
          summary: null,
          tomorrowPlanRemarks: null,
          tomorrowWeather: null,
          tomorrowWindPower: null,
          tomorrowMaterial: null,
          assistance: null,
          saveType: null,
          createTime: 0,
          likeCount: 0,
          commentCount: 0,
          readCount: 0,
          contents: [],
          tomorrowContents: [],
          projectId: null,
          comments: [],
          likeUsers: [],
          dailyDocuments: [],
          createUser: null,
          createUserName: null,
        },
      },
    })
    Taro.navigateTo({
      url: '/pages/daily/dailyedit',
    })
  }

  render() {
    const { daily } = this.props
    const { dailyList } = daily
    return (
      <View className="data">
        {dailyList.length > 0 ? (
          <TaroVirtualList
            list={dailyList}
            onRender={this.renderFunc}
            onBottom={this.handleBottom}
            onComplete={this.handleComplete}
            scrollViewProps={{
              style: {
                height: '100vh',
              },
            }}
          />
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '100vh',
            }}
          >
            <View
              className="dpl pr"
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '30px',
                paddingTop: '50px',
              }}
            >
              <Image style="width: 100px;height: 50px;" src={notfund} />
            </View>
            <View>
              <Text
                style={{
                  fontSize: '14px',
                  color: '#8a96a3',
                  paddingBottom: '30px',
                }}
              >
                暂无数据
              </Text>
            </View>
          </View>
        )}
        <View className="add-btn">
          <AtButton className="btn" type="primary" onClick={this.goToEditDaily}>
            日报填写
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Index
