/*
 * @Author: yanxiaodi
 * @Date: 2020-09-14 19:44:38
 * @Last Modified by: yanxiaodi
 * @Last Modified time: 2020-09-17 18:12:39
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtCard } from 'taro-ui'
import isArray from 'lodash/isArray'
import { TaroVirtualList } from 'taro-virtual-list'

import u1366 from '../../assets/images/u1366.png'

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

interface Data {
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
class Data extends Component {
  renderFunc = (item, index, pageIndex) => {
    return (
      <View key={index} className="daily-list">
        <View className="daily-item">
          <View className="daily-up">
            <Image
              className="home_img"
              style="width: 110px;min-width:110px;height: 80px"
              src={u1366}
            />
            <View className="daily-desc">
              <View className="daily-title">
                <Text>2021-07-26 日报</Text>
              </View>
              <View className="daily-sub">
                <Text>xxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
              </View>
            </View>
          </View>
          <View className="daily-down">
            <Text className="daily-author-date">
              {'邱风虎'} {'2021-11-11 11:11'}
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
              <Text style={{ color: '#F59A23' }}>{'延迟'}</Text>
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

  render() {
    const { asyncData } = this.props
    const list = [
      { name: 'tiger' },
      { name: 'tiger' },
      { name: 'tiger' },
      { name: 'tiger' },
      { name: 'tiger' },
      { name: 'tiger' },
      { name: 'tiger' },
      { name: 'tiger' },
      { name: 'tiger' },
      { name: 'tiger' },
      { name: 'tiger' },
    ]
    return (
      <View className="data">
        <TaroVirtualList
          list={list}
          onRender={this.renderFunc}
          onBottom={this.handleBottom}
          onComplete={this.handleComplete}
          scrollViewProps={{
            style: {
              height: '100vh',
            },
          }}
        />
        <View>
          <AtButton type="primary">日报填写</AtButton>
        </View>
      </View>
    )
  }
}

export default Data
