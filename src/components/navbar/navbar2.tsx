import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './navbar.less'

class Navbar2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusBarHeight: 20,
      toBar: 44,
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.getSystemInfo()
  }

  componentWillUnmout() {}

  componentWillReceiveProps() {}

  goback() {
    Taro.navigateBack({
      delta: 1,
    })
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

  render() {
    const { title } = this.props
    const { statusBarHeight, toBar } = this.state

    const bg = { height: 64 + 'px', paddingTop: statusBarHeight + 'px' }

    const status = {
      height: `${statusBarHeight}px`,
    }
    const toBarStyle: any = {
      height: `${toBar}px`,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#fff',
      zIndex: '10001',
    }
    const titleStyle = {
      height: `${toBar}px`,
      lineHeight: `${toBar}px`,
    }
    const gobackStyle = {
      height: `${toBar}px`,
    }
    const topStyle = {
      height: `${toBar + 2 * statusBarHeight}px`,
      paddingTop: `${statusBarHeight}px`,
      backgroundColor: '#fff',
    }

    return (
      <View className="container" style={topStyle}>
        <View style={toBarStyle}>
          <View className="warper_2" style={titleStyle}>
            {title}
          </View>
        </View>
      </View>
    )
  }
}
export default Navbar2
