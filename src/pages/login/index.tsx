import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

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
  login: any
}

type IProps = PageStateProps

interface Index {
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
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}

  getnum = e => {
    const { dispatch, login } = this.props
    let _this = this
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      // 允许
      const params = {
        appId: 'wxd8103b355b8df237',
        sessionKey: login.sessionKey,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      }

      dispatch({
        type: 'login/getPhoneNumber',
        payload: params,
      }).then(res => {
        console.log(res, '获取手机号')
        dispatch({
          type: 'login/updateState',
          payload: {
            identifier: res,
            code: 'WeChatPhoneNumber',
          },
        })

        Taro.setStorageSync('identifier', res)

        dispatch({
          type: 'login/codeLogin',
          payload: {
            appId: 'wxd8103b355b8df237',
            openId: login.openId,
            identifier: res,
            code: 'WeChatPhoneNumber',
          },
        }).then(res => {
          if (Number(res.code) == 1) {
            // 设置用户信息
            Taro.setStorageSync('userId', res.userInfo.id)
            Taro.setStorageSync('userName', res.userInfo.realname)

            Taro.showToast({
              title: res.message || '登录成功',
              icon: 'none',
              mask: true,
            })
            // 登录成功，跳转到首页
            Taro.redirectTo({
              url: '/pages/index/index',
            })
            dispatch({
              type: 'login/updateState',
              payload: {
                identifier: '',
                code: '',
              },
            })
          } else {
            Taro.showToast({
              title: res.message || '登录失败',
              icon: 'none',
              mask: true,
            })
          }
        })
      })
    } else {
      // 拒绝
      _this.setState({
        show: true,
      })
    }
  }

  onClose = () => {
    this.setState({
      show: false,
    })
  }

  gotoRegister = () => {
    const { dispatch, login } = this.props
    dispatch({
      type: 'login/updateState',
      payload: {
        identifier: '',
        code: '',
      },
    })
    Taro.navigateTo({
      url: '/pages/login/phone_register',
    })
  }

  render() {
    return (
      <View className="container">
        <View className="content">
          <View className="header">
            <Image
              style="width: 63px;height: 63px;border-radius: 50%;overflow:hidden;"
              src={
                'https://xinlj.oss-cn-beijing.aliyuncs.com/wechat/bocLogo.png'
              }
            />
          </View>
          数字交付平台
          <AtButton
            className="bindPhone"
            openType="getPhoneNumber"
            onGetPhoneNumber={this.getnum}
          >
            微信用户快捷登录
          </AtButton>
        </View>
        <View className="register" onClick={this.gotoRegister}>
          手机号码登录/注册
        </View>
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
