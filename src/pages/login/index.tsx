import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import bocLogo from '../../assets/images/bocLogo.png'

import './index.less'
import './style.styl'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {}
type PageOwnProps = {}

type IProps = PageStateProps & PageOwnProps

interface Index {
  props: IProps
}

class Index extends Component {
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}

  render() {
    return (
      <View className="container">
        <View className="content">
          <View className="header">
            <Image
              style="width: 63px;height: 63px;border-radius: 50%;overflow:hidden;"
              src={bocLogo}
            />
          </View>
          数字交付平台
          <AtButton className="bindPhone" openType="getPhoneNumber">
            微信用户快捷登录
          </AtButton>
        </View>
        <View className="register">手机号码登录/注册</View>
        <View
          style={{
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          <Text>企业人员内部使用</Text>
        </View>
      </View>
    )
  }
}

export default Index
