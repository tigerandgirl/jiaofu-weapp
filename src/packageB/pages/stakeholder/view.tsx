/*
 * @Author: dangwei
 * @Fn: 干系人
 * @Date: 2021-08-19
 * @Last Modified by: dangwei
 * @Last Modified time: 2021-08-19 10:32:39
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton, AtList, AtListItem } from 'taro-ui'

import './style.styl'

type PageStateProps = {
  dispatch: Function
  stakeholder: any
  project: any
}

type IProps = PageStateProps

interface Index {
  props: IProps
}

// @ts-ignore
@connect(
  state => ({
    stakeholder: state.stakeholder,
    project: state.project,
  }),
  dispatch => ({
    dispatch,
  })
)
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const { name } = Taro.Current.router.params
    Taro.setNavigationBarTitle({ title: name })
  }

  componentDidMount() {}

  componentWillUnmount() {
    // 自定义退回
    Taro.redirectTo({
      url: '/packageB/pages/stakeholder/index',
    })
  }

  handleEdit = () => {
    Taro.navigateTo({
      url: '/packageB/pages/stakeholder/edit?name=edit',
    })
  }

  render() {
    const { stakeholder } = this.props
    const { stakeholderDetail } = stakeholder
    const {
      phone = '',
      position = '',
      sex = '',
      email = '',
      photo = '',
      wechat = '',
      communicatorName = '',
      communicationMode,
      remark = '',
      companyName = '',
      copingStrategy = '',
    } = stakeholderDetail
    return (
      <View style={{ paddingBottom: '80px' }}>
        <AtList>
          <AtListItem title="手机号:" extraText={phone} />
          <AtListItem title="邮箱:" extraText={email} />
          <AtListItem title="微信号:" extraText={wechat} />
          <AtListItem
            title="公司:"
            extraText={companyName == null ? '' : companyName}
          />
          <AtListItem title="职位:" extraText={position} />
          <AtListItem title="应对策略:" extraText={copingStrategy} />
          <AtListItem title="性别:" extraText={sex} />
          <AtListItem title="对接人:" extraText={communicatorName} />
          <View style={{ padding: '10px' }}>沟通方式:</View>
          <View style={{ padding: '10px', width: '100%' }}>
            {communicationMode.map((item, index) => {
              return (
                <View key={item.id} className={'communicationMode-item'}>
                  {item.rule}
                </View>
              )
            })}
          </View>
          <View style={{ padding: '10px' }}>照片:</View>
          {photo == null || photo == '' ? (
            <View style={{ padding: '0 10px' }}>无</View>
          ) : (
            <View style={{ padding: '0 10px' }}>
              <Image
                style={{ width: '180px', height: '180px' }}
                src={photo}
              ></Image>
            </View>
          )}
          <AtListItem title="备注:" extraText={remark} />
        </AtList>
        <View className="stakeholder-fixed">
          <AtButton
            onClick={this.handleEdit}
            size="small"
            customStyle={{ width: '40%', marginTop: '8px' }}
            type="primary"
          >
            编辑
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Index
