import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

import './phone_register.less'
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
type PageOwnProps = {}

type IProps = PageStateProps & PageOwnProps

interface PhoneRegister {
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
class PhoneRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codeinfo: '发送验证码',
      codebtn: false,
    }
  }

  goBack = () => {
    Taro.navigateBack({
      delta: 1002,
    })
  }

  // 文本改变
  handleChange(type, value) {
    const { dispatch } = this.props
    let obj = {}
    obj[type] = value
    dispatch({
      type: 'login/updateState',
      payload: {
        obj,
      },
    })
  }

  // 获取验证码
  sendSMS = () => {
    let that = this
    const { dispatch, login } = this.props
    let i = 60
    let phone = login.identifier
    let regex = /^[1][3,4,5,7,8][0-9]{9}$/
    if (regex.test(phone)) {
      this.setState({
        codebtn: true,
      })

      dispatch({
        type: 'login/getPhoneNumber',
        payload: {
          openId: login.openId,
          identifier: phone,
        },
      })
        .then(res => {
          if (res == true) {
            Taro.showToast({
              title: '验证码发送成功',
              icon: 'none',
            })
            let t = setInterval(() => {
              this.setState({
                codeinfo: --i + 's',
              })
            }, 1000)
            setInterval(() => {
              this.setState({
                codeinfo: '发送验证码',
                codebtn: false,
              })
              clearInterval(t)
            }, 60000)
          } else {
            Taro.showToast({
              title: '验证码发送失败',
              icon: 'none',
            })
            that.setState({
              codebtn: false,
            })
          }
        })
        .catch(() => {
          that.setState({
            codebtn: false,
          })
        })
    } else {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      })
      return
    }
  }

  // 验证码登录
  submit = () => {
    const { dispatch, login } = this.props
    if (login.identifier == '') {
      Taro.showToast({
        title: '手机号不能为空',
        icon: 'none',
      })
      return
    }
    if (login.code == '') {
      Taro.showToast({
        title: '验证码不能为空',
        icon: 'none',
      })
      return
    }

    dispatch({
      type: 'login/codeLogin',
      payload: {
        appId: 'wxd8103b355b8df237',
        openId: login.openId,
        identifier: login.identifier,
        code: login.code,
      },
    }).then(res => {
      if (Number(res.code) == 1) {
        Taro.showToast({
          title: res.message || '登录成功',
          icon: 'none',
          mask: true,
        })
        // 登录成功，跳转到首页
        Taro.switchTab({
          url: '/pages/project/index',
        })
      } else {
        Taro.showToast({
          title: res.message || '登录失败',
          icon: 'none',
          mask: true,
        })
      }
    })
  }

  render() {
    const { login } = this.props
    const {} = this.state
    return (
      <View className="container">
        <View className="body">
          <View className="phone">
            <AtInput
              name="value"
              type="phone"
              maxlength={11}
              placeholder="请输入手机号"
              value={login.identifier}
              onChange={this.handleChange.bind(this, 'identifier')}
            />
          </View>
          <View className="code">
            <AtInput
              name="value2"
              type="number"
              placeholder="请输入验证码"
              value={login.code}
              onChange={this.handleChange.bind(this, 'code')}
            />
            <AtButton
              className="btn"
              disabled={this.state.codebtn}
              onClick={this.sendSMS}
            >
              {this.state.codeinfo}
            </AtButton>
          </View>
          <View style={{ display: 'flex', justifyContent: 'center' }}>
            <View className="submit">
              <AtButton onClick={this.goBack}>取消</AtButton>
            </View>
            <View className="submit">
              <AtButton className="btn" onClick={this.submit}>
                登录
              </AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default PhoneRegister
