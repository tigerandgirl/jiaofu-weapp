import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import Navbar2 from '../../components/navbar/navbar2'

import { TaroVirtualList } from 'taro-virtual-list'

import './style.styl'

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
    const { dispatch, index } = this.props
    const { params } = index
    dispatch({
      type: 'index/fetch',
      payload: {
        text: '',
        state: 0,
        orderType: 0,
        parentId: null,
        pageIndex: 1,
        pageSize: 50,
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
          src={
            item.mainPhoto !== null
              ? item.mainPhoto
              : 'cloud://cloud1-2ge3hz6823947d41.636c-cloud1-2ge3hz6823947d41-1306866431/img/dxk.jpg'
          }
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

  // 下拉刷新
  onPullDownRefresh = () => {
    const { dispatch, index } = this.props
    const { parmas } = index
    dispatch({
      type: 'login/updateState',
      payload: {
        params: Object.assign(parmas, { pageIndex: 1 }),
      },
    })

    dispatch({
      type: 'index/fetch',
      payload: { parmas },
    }).then(res => {
      dispatch({
        type: 'login/updateState',
        payload: {
          params: Object.assign(parmas, {
            pageSize: res.pageSize,
            projectTotalCount: res.totalCount,
          }),
        },
      })
      Taro.stopPullDownRefresh()
    })
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
