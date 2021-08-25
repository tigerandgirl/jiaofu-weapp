/*
 * @Author: dangweri
 * @Date: 2020-09-14 19:44:38
 * @Last Modified by: yanxiaodi
 * @Last Modified time: 2020-09-17 18:12:39
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import {
  AtForm,
  AtInput,
  AtButton,
  AtListItem,
  AtImagePicker,
  AtFloatLayout,
  AtRadio,
} from 'taro-ui'

import './style.styl'
import Config from '../../../config'

type PageStateProps = {
  dispatch: Function
  stakeholder: any
  project: any
  isOpened: boolean
}
type IProps = PageStateProps

interface Edit {
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
class Edit extends Component {
  state = {
    selector: ['A类-令其满意', 'B类-重点管理', 'C类-随时告知', 'D类-监督管理'],
    files: [],
    isOpened: false,
  }

  componentWillMount() {
    const { name } = Taro.Current.router.params
    if (name != undefined && name != '') {
      const { stakeholder } = this.props
      const { stakeholderDetail } = stakeholder
      Taro.setNavigationBarTitle({ title: '编辑干系人' })
      this.setState({
        files:
          stakeholderDetail.photo == '' || stakeholderDetail.photo == null
            ? []
            : [{ url: stakeholderDetail.photo }],
      })
    } else {
      Taro.setNavigationBarTitle({ title: '新增干系人' })
    }
  }

  componentDidMount() {
    const { dispatch, project } = this.props
    const { projectDetail } = project
    const { id } = projectDetail
    const params = { projectId: id }
    dispatch({
      type: 'stakeholder/getBuildTeamFourItemListByProjectId',
      payload: params,
    })

    // 主对接人
    dispatch({
      type: 'stakeholder/getBuildTeamOneItemListByProjectId',
      payload: params,
    })

    // 公司列表
    dispatch({
      type: 'stakeholder/getStakeholderCompanyList',
      payload: params,
    })
  }

  handleChange = (type, value) => {
    const { stakeholder, dispatch } = this.props
    const { stakeholderDetail } = stakeholder
    dispatch({
      type: 'stakeholder/updateState',
      payload: {
        stakeholderDetail: Object.assign(stakeholderDetail, {
          [type]: value,
        }),
      },
    })
  }

  handleChange2 = item => {
    const { stakeholder, dispatch } = this.props
    const { stakeholderDetail } = stakeholder
    const data = JSON.parse(JSON.stringify(stakeholderDetail.communicationMode))
    let dataIndex = data.findIndex(v => v.id == item.id)
    if (dataIndex != -1) {
      // 删除
      data.splice(dataIndex, 1)
    } else {
      // 添加
      data.push(item)
    }
    dispatch({
      type: 'stakeholder/updateState',
      payload: {
        stakeholderDetail: Object.assign(stakeholderDetail, {
          communicationMode: data,
        }),
      },
    })
  }

  handleClick = (type, e) => {
    const { stakeholder, dispatch } = this.props
    const { stakeholderDetail } = stakeholder
    dispatch({
      type: 'stakeholder/updateState',
      payload: {
        stakeholderDetail: Object.assign(stakeholderDetail, {
          [type]:
            type == 'sex'
              ? ['男', '女'][e.detail.value]
              : this.state.selector[e.detail.value],
        }),
      },
    })
  }

  handleClick2 = (type, e) => {
    const { stakeholder, dispatch } = this.props
    const { stakeholderDetail, communicator } = stakeholder
    const index = e.detail.value
    dispatch({
      type: 'stakeholder/updateState',
      payload: {
        stakeholderDetail: Object.assign(stakeholderDetail, {
          communicatorId: communicator[index].userId,
          communicatorName: communicator[index].userName,
        }),
      },
    })
  }

  // 上传
  onFileChange = (v, doType, index) => {
    // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    let that = this
    if (doType === 'remove') {
      that.setState(() => {
        return {
          files: v,
        }
      })
    } else {
      // 新增
      Taro.showLoading({
        title: '上传中...',
        icon: 'loading-2',
      })
      //上传图片
      Taro.uploadFile({
        url: Config.multiUpload,
        filePath: v[0].url,
        name: 'file',
        header: {
          'Content-Type': 'multipart/form-data',
        },
        formData: {
          method: 'POST',
          fileType: 1,
        },
        success: function (res) {
          const data = JSON.parse(res.data).body
          that.setState({
            files: data.map(v => {
              return { url: v.fileURL }
            }),
          })
        },
        fail: function () {
          Taro.hideLoading()
          Taro.showToast({
            title: '上传失败',
            icon: 'none',
          })
        },
        complete: () => {
          Taro.hideLoading()
        },
      })
    }
  }

  // 点击图片回调
  onImageClick = (_index, file) => {
    Taro.previewImage({
      current: file.url,
      urls: [file.url],
    })
  }

  onSubmit = () => {
    const { stakeholder, dispatch } = this.props
    const { stakeholderDetail } = stakeholder
    const {
      name,
      phone,
      position,
      companyName,
      communicationMode,
    } = stakeholderDetail
    if (name == null || name == '') {
      Taro.showToast({
        title: '姓名是必填',
        icon: 'none',
      })
      return false
    }
    if (position == null || position == '') {
      Taro.showToast({
        title: '职位是必填',
        icon: 'none',
      })
      return false
    }
    if (companyName == null || companyName == '') {
      Taro.showToast({
        title: '公司是必填',
        icon: 'none',
      })
      return false
    }
    if (phone == null || phone == '') {
      Taro.showToast({
        title: '手机号是必填',
        icon: 'none',
      })
      return false
    }
    if (communicationMode.some(v => v.rule == '日报')) {
      Taro.showToast({
        title: '邮箱是必填',
        icon: 'none',
      })
      return false
    }
    const params = Object.assign(stakeholderDetail, {
      photo: this.state.files.length > 0 ? this.state.files[0].url : '',
    })
    dispatch({
      type: 'stakeholder/saveStakeholder',
      payload: {
        s: params,
      },
    }).then(res => {
      if (res) {
        Taro.showToast({
          title: '保存成功',
          icon: 'none',
        })
        // 跳转到详情页
        Taro.navigateTo({
          url:
            '/packageB/pages/stakeholder/view?name=' + stakeholderDetail.name,
        })
      }
    })
  }

  componentWillUnmount() {
    // 自定义退回
    Taro.redirectTo({
      url: '/packageB/pages/stakeholder/index',
    })
  }

  handleOpen = () => {
    this.setState({
      isOpened: true,
    })
  }

  handleClose = () => {
    this.setState({
      isOpened: false,
    })
  }

  handleCompany = value => {
    const { stakeholder, dispatch } = this.props
    const { stakeholderDetail, companyList } = stakeholder
    const index = companyList.findIndex(m => m.id === value)
    dispatch({
      type: 'stakeholder/updateState',
      payload: {
        stakeholderDetail: Object.assign(stakeholderDetail, {
          companyName: companyList[index].name,
          companyId: companyList[index].id,
        }),
      },
    })
    this.handleClose()
  }

  checkPhone = () => {
    const { stakeholder, dispatch } = this.props
    const { stakeholderDetail } = stakeholder
    if (stakeholderDetail.phone == null || stakeholderDetail.phone == '') {
      Taro.showToast({
        title: '手机号是必填',
        icon: 'none',
      })
      return false
    }
    dispatch({
      type: 'stakeholder/updateState',
      payload: {
        stakeholderDetail: Object.assign(stakeholderDetail, {
          wechat: stakeholderDetail.phone,
        }),
      },
    })
  }

  render() {
    const { selector, files, isOpened } = this.state
    const { stakeholder } = this.props
    const {
      stakeholderDetail,
      communicationModeList,
      communicator,
      companyList,
    } = stakeholder
    const communicatorData =
      communicator == null
        ? []
        : JSON.parse(JSON.stringify(communicator)).map(m => m.userName)
    const companyListData =
      companyList == null
        ? []
        : JSON.parse(JSON.stringify(companyList)).map(m => {
            return { label: m.name, value: m.id }
          })
    return (
      <View className="stakeholder-edit">
        <AtForm>
          <AtInput
            className="stakeholderDetail-required"
            name="name"
            title="姓名:"
            type="text"
            placeholder="请输入"
            value={stakeholderDetail.name}
            onChange={this.handleChange.bind(this, 'name')}
          />
          <AtInput
            className="stakeholderDetail-required"
            name="position"
            title="职位:"
            type="text"
            placeholder="请输入"
            value={stakeholderDetail.position}
            onChange={this.handleChange.bind(this, 'position')}
          />
          <AtListItem
            className="stakeholderDetail-required"
            title="公司:"
            arrow="right"
            extraText={
              stakeholderDetail.companyName == null
                ? ''
                : stakeholderDetail.companyName
            }
            hasBorder={true}
            onClick={this.handleOpen}
          />
          <AtInput
            className="stakeholderDetail-required"
            name="phone"
            title="手机号:"
            type="text"
            placeholder="请输入"
            value={stakeholderDetail.phone}
            onChange={this.handleChange.bind(this, 'phone')}
          />
          <View style={{ padding: '10px' }}>沟通方式:</View>
          <View style={{ padding: '10px', width: '100%' }}>
            {communicationModeList.map((item, index) => {
              let isFlag =
                stakeholderDetail.communicationMode == null
                  ? false
                  : stakeholderDetail.communicationMode.findIndex(
                      vitem => vitem.id == item.id
                    ) != -1
                  ? true
                  : false
              return (
                <View
                  onClick={this.handleChange2.bind(this, item)}
                  key={item.id}
                  className={
                    isFlag
                      ? 'communicationMode-item communicationMode-active'
                      : 'communicationMode-item'
                  }
                >
                  {item.rule}
                </View>
              )
            })}
          </View>
          <AtInput
            name="email"
            title="邮箱:"
            type="text"
            placeholder="请输入"
            value={stakeholderDetail.email}
            onChange={this.handleChange.bind(this, 'email')}
          />
          <AtInput
            name="wechat"
            title="微信号:"
            type="text"
            placeholder="请输入"
            value={stakeholderDetail.wechat}
            onChange={this.handleChange.bind(this, 'wechat')}
          >
            <Text onClick={this.checkPhone} style={{ fontSize: '14px' }}>
              同手机号
            </Text>
          </AtInput>
          <Picker
            mode="selector"
            range={selector}
            onChange={this.handleClick.bind(this, 'copingStrategy')}
          >
            <AtListItem
              className="stakeholderDetail-common"
              title="应对策略:"
              arrow="right"
              extraText={stakeholderDetail.copingStrategy}
              hasBorder={true}
            />
          </Picker>
          <Picker
            mode="selector"
            range={['男', '女']}
            onChange={this.handleClick.bind(this, 'sex')}
          >
            <AtListItem
              className="stakeholderDetail-common"
              title="性别:"
              arrow="right"
              extraText={stakeholderDetail.sex}
              hasBorder={true}
            />
          </Picker>
          <Picker
            mode="selector"
            range={communicatorData}
            onChange={this.handleClick2.bind(this, 'communicatorName')}
          >
            <AtListItem
              className="stakeholderDetail-common"
              title="对接人:"
              arrow="right"
              extraText={stakeholderDetail.communicatorName}
              hasBorder={true}
            />
          </Picker>
          <View style={{ padding: '10px' }}>照片:</View>
          <View>
            <AtImagePicker
              customStyle={{ width: '100px' }}
              length={1}
              count={1}
              onImageClick={this.onImageClick}
              files={files}
              onChange={this.onFileChange}
              showAddBtn={files.length >= 1 ? false : true}
            />
          </View>
          <AtInput
            name="remark"
            title="备注:"
            type="text"
            placeholder="请输入"
            value={stakeholderDetail.remark}
            onChange={this.handleChange.bind(this, 'remark')}
          />
          <View className="stakeholder-fixed">
            <AtButton
              onClick={this.onSubmit.bind(this)}
              customStyle={{ width: '100%' }}
              type="primary"
            >
              提交
            </AtButton>
          </View>
        </AtForm>
        {/*公司*/}
        <AtFloatLayout
          isOpened={isOpened}
          title="选择公司"
          onClose={this.handleClose.bind(this)}
        >
          <AtRadio
            options={companyListData}
            value={stakeholderDetail.companyId}
            onClick={this.handleCompany.bind(this)}
          />
        </AtFloatLayout>
      </View>
    )
  }
}

export default Edit
