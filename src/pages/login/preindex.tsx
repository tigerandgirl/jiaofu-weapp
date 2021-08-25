import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

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

type PageStateProps = {
  dispatch: Function
  asyncData: any
}
type PageOwnProps = {}

type IProps = PageStateProps & PageOwnProps

interface PreIndex {
  props: IProps
}

@connect(
  state => ({
    login: state.login,
  }),
  dispatch => ({
    dispatch,
  })
)
class PreIndex extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    console.log(3333)
    // 默认登录
    Taro.checkSession()
      .then(res => {
        console.log(res)
        return Taro.getStorage({ key: 'session3rd' })
      })
      .catch(err => {
        console.log(err)
        return Taro.login().then(loginRes => {
          console.log('loginRes=>', loginRes)
          return dispatch({
            type: 'login/autoLogin',
            payload: { appid: 'wxd8103b355b8df237', code: loginRes.code },
          }).then(autores => {
            Taro.setStorageSync(
              'autoresSession',
              'SESSION=' + autores.sessionId
            )
            dispatch({
              type: 'login/updateState',
              payload: {
                openId: autores.openId,
                sessionKey: autores.sessionKey,
                header: Object.assign(
                  {},
                  { Cookie: 'SESSION=' + autores.sessionId }
                ),
              },
            })

            if (autores.userInfo == null) {
              // 该用户没有登录，进入登录页
              dispatch({
                type: 'login/updateState',
                payload: {
                  identifier: '',
                  code: '',
                },
              })
              Taro.redirectTo({
                url: '/pages/login/index',
              })
            } else {
              // 用户已登录,直接进入首页
              Taro.redirectTo({
                url: '/pages/index/index',
              })
              Taro.setStorageSync('userId', autores.userInfo.id)
              Taro.setStorageSync('userName', autores.userInfo.realname)
              Taro.setStorageSync('identifier', autores.userInfo.phone)
            }
          })
        })
      })
  }

  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}

  render() {
    return <View className="container"></View>
  }
}

export default PreIndex
