import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtDivider } from 'taro-ui'

import Navbar2 from '../../components/navbar/navbar2'

import { TaroVirtualList } from 'taro-virtual-list'

import { styled } from 'linaria/react'

import dxk from '../../assets/images/dxk.jpg'
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
  index: any
}

type IProps = PageStateProps

interface Index {
  props: IProps
}

@connect(
  state => ({
    index: state.index,
  }),
  dispatch => ({
    dispatch,
  })
)
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusBarHeight: 20,
      toBar: 44,
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps)
  // }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidMount() {
    this.getSystemInfo()
    this.getProjectPageList()
  }

  getSystemInfo = () => {
    let that = this
    Taro.getSystemInfo({}).then(res => {
      this.setState({ statusBarHeight: res.statusBarHeight || 20 })
      if (res.platform == 'ios') {
        that.setState({
          toBar: 44,
        })
      } else if (res.platform == 'android') {
        that.setState({
          toBar: 48,
        })
      } else {
        that.setState({
          toBar: 44,
        })
      }
    })
  }

  getProjectPageList = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'index/fetch',
      payload: {
        text: '',
        state: 0,
        orderType: 0,
        parentId: null,
        pageIndex: 1,
        pageSize: 10,
      },
    })
  }

  goToProject = params => {
    const { dispatch } = this.props
    dispatch({
      type: 'project/getProjectDetail',
      payload: params,
    }).then(res => {
      // 查询数据
      Taro.navigateTo({
        url: '/pages/project/index',
      })
    })
  }

  renderFunc = (item, index, pageIndex) => {
    return (
      <View
        key={index}
        className="home_list"
        onClick={() => {
          this.goToProject({ id: item.id })
        }}
      >
        <Image
          className="home_img"
          style="width: 100%;height: 140px; "
          src={item.mainPhoto !== null ? item.mainPhoto : dxk}
        />
        <View className="home_title">
          <Text>{item.name}</Text>
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
    const { index } = this.props
    const { statusBarHeight, toBar } = this.state
    const { asyncData } = index
    return (
      <View className="index">
        <View style={{ marginBottom: `${statusBarHeight + toBar}px` }}>
          <Navbar2 title={'智建交付'} />
        </View>
        <TaroVirtualList
          list={asyncData}
          onRender={this.renderFunc}
          onBottom={this.handleBottom}
          onComplete={this.handleComplete}
          scrollViewProps={{
            style: {
              height: '100vh',
            },
          }}
        />
      </View>
    )
  }
}

export default Index
