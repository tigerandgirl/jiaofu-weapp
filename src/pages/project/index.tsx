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

import './style.styl'

type PageStateProps = {
  dispatch: Function
  project: any
}

type IProps = PageStateProps

interface Index {
  props: IProps
}

@connect(
  state => ({
    project: state.project,
  }),
  dispatch => ({
    dispatch,
  })
)
class Index extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { project } = this.props
    const { projectDetail } = project
    console.log('projectDetail', projectDetail)
    Taro.setNavigationBarTitle({
      title: projectDetail.name,
    })
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

  goToEditDaily = () => {
    Taro.navigateTo({
      url: '/pages/daily/dailyedit',
    })
  }

  goToDaily = () => {
    const { dispatch, project } = this.props
    const { projectDetail } = project

    dispatch({
      type: 'daily/getDailyListPage',
      payload: {
        text: '',
        projectId: projectDetail.id,
        type: 0,
        pageIndex: 1,
        pageSize: 50,
      },
    })
    // 查询数据
    Taro.navigateTo({
      url: '/pages/daily/index',
    })
  }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <View
          onClick={this.goToDaily}
          style={{ marginTop: '90rpx', width: '400rpx' }}
        >
          <AtButton type="secondary" size="normal">
            日报
          </AtButton>
        </View>
        <View style={{ marginTop: '60rpx', width: '400rpx' }}>
          <AtButton type="secondary" size="normal">
            干系人
          </AtButton>
        </View>
        <View style={{ marginTop: '60rpx', width: '400rpx' }}>
          <AtButton type="secondary" size="normal">
            安全交底
          </AtButton>
        </View>
        <View style={{ marginTop: '60rpx', width: '400rpx' }}>
          <AtButton type="secondary" size="normal">
            物流信息
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Index
