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
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import moment from 'moment'

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
    this.state = {
      taskId: '',
    }
  }

  componentDidMount() {
    const { dispatch, project } = this.props
    const { projectDetail } = project
    const { stages } = projectDetail
    const taskId =
      stages
        .filter(item => item.name == '准备阶段')[0]
        .tasks.filter(item => item.taskType == 'stakeholder')[0].id || ''
    const params = { taskId: taskId }
    this.setState({
      taskId: taskId,
    })
    dispatch({
      type: 'stakeholder/getStakeholderList',
      payload: params,
    })
  }

  tellPhone = type => {
    if (type == '' || type == null) return false
    Taro.makePhoneCall({
      phoneNumber: type,
    })
  }

  handleAdd = () => {
    const createUserName = ''
    const createTime = moment().valueOf()
    let param = {
      id: '',
      name: '',
      taskId: this.state.taskId,
      copingStrategy: '',
      phone: '',
      position: '',
      sex: '',
      age: '',
      appellation: '',
      email: '',
      maritalStatus: '',
      monthlyIncome: '',
      hobby: '',
      profile: '',
      photo: '',
      wechat: '',
      communicatorId: '',
      communicatorName: '',
      communicationMode: [],
      remark: '',
      createTime: createTime,
      createUserName: createUserName,
      companyName: '',
      companyId: '',
    }
    const { dispatch } = this.props
    dispatch({
      type: 'stakeholder/updateState',
      payload: { stakeholderDetail: param },
    })
    Taro.navigateTo({
      url: '/packageB/pages/stakeholder/edit',
    })
  }

  handleNext = item => {
    const { dispatch } = this.props
    dispatch({
      type: 'stakeholder/updateState',
      payload: { stakeholderDetail: item },
    })
    Taro.navigateTo({
      url: '/packageB/pages/stakeholder/view?name=' + item.name,
    })
  }

  render() {
    const { stakeholder } = this.props
    const { stakeholderList } = stakeholder

    return (
      <View className="w pb80">
        {stakeholderList.length > 0 ? (
          stakeholderList.map((item, index) => {
            return (
              <View
                key={item.id}
                className="w"
                style={{ padding: '0 10px', marginBottom: '15px' }}
              >
                {item.photo == null || item.photo == '' ? (
                  <View
                    onClick={this.handleNext.bind(this, item)}
                    className="stakeholder-img"
                  >
                    {item.name.substring(item.name.length - 2)}
                  </View>
                ) : (
                  <Image
                    onClick={this.handleNext.bind(this, item)}
                    src={item.photo}
                    className="stakeholder-img2"
                  ></Image>
                )}
                <View className="stakeholder-title">
                  <View
                    className="title-top"
                    onClick={this.handleNext.bind(this, item)}
                  >
                    <Text>{item.name}</Text>
                    <Text style={{ marginLeft: '100px' }}>{item.position}</Text>
                  </View>
                  <View className="title-bottom">
                    <Text
                      style={{ color: '#57ACFF', width: '110px' }}
                      onClick={this.tellPhone.bind(this, item.phone)}
                    >
                      {item.phone}
                    </Text>
                    <View
                      style={{
                        display: 'inline-block',
                        width: 'calc(100% - 115px)',
                        height: '20px',
                      }}
                      onClick={this.handleNext.bind(this, item)}
                    ></View>
                  </View>
                </View>
              </View>
            )
          })
        ) : (
          <View style={{ marginTop: '20px', textAlign: 'center' }}>
            暂无数据
          </View>
        )}
        <View className="stakeholder-fixed">
          <AtButton
            onClick={this.handleAdd}
            size="small"
            customStyle={{ width: '40%', marginTop: '8px' }}
            type="primary"
          >
            新增干系人
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Index
