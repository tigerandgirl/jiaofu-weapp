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
    //console.log('projectDetail', projectDetail)
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

  goToDaily = type => {
    const { dispatch, project } = this.props
    const { projectDetail } = project
    if (type == 'daily') {
      // 日报
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
        url: '/packageC/pages/daily/index',
      })
    } else if (type == 'stakeholder') {
      Taro.navigateTo({
        url: '/packageB/pages/' + type + '/index',
      })
    } else if (type == 'safetycontent') {
      const { stages } = projectDetail
      const taskId =
        stages
          .filter(item => item.name == '执行阶段')[0]
          .tasks.filter(item => item.taskType == 'constructionContent')[0].id ||
        ''
      const params = { taskId: taskId }

      dispatch({
        type: 'safetycontent/getTaskStepState',
        payload: params,
      }).then(res => {
        if (res.state1 == 2) {
          Taro.navigateTo({
            url: '/packageA/pages/' + type + '/view',
          })
        } else {
          Taro.navigateTo({
            url: '/packageA/pages/' + type + '/index',
          })
        }
      })
    }
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
          onClick={this.goToDaily.bind(this, 'daily')}
          style={{ marginTop: '90rpx', width: '400rpx' }}
        >
          <AtButton type="secondary" size="normal">
            日报
          </AtButton>
        </View>
        <View
          onClick={this.goToDaily.bind(this, 'stakeholder')}
          style={{ marginTop: '60rpx', width: '400rpx' }}
        >
          <AtButton type="secondary" size="normal">
            干系人
          </AtButton>
        </View>
        <View
          onClick={this.goToDaily.bind(this, 'safetycontent')}
          style={{ marginTop: '60rpx', width: '400rpx' }}
        >
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
