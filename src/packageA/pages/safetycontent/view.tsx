/*
 * 安全交底 详情页
 * dangwei@bocspace.cn
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro, { showToast } from '@tarojs/taro'
import { AtButton, AtImagePicker } from 'taro-ui'
import { View, Text } from '@tarojs/components'

import './style.styl'

type PageStateProps = {
  dispatch: Function
  safetycontent: any
  project: any
}

type IProps = PageStateProps

interface Index {
  props: IProps
}

// @ts-ignore
@connect(
  state => ({
    project: state.project,
    safetycontent: state.safetycontent,
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
        .filter(item => item.name == '执行阶段')[0]
        .tasks.filter(item => item.taskType == 'constructionContent')[0].id ||
      ''
    const params = { taskId: taskId }
    this.setState({
      taskId,
    })

    dispatch({
      type: 'safetycontent/getDocumentList',
      payload: params,
    })

    dispatch({
      type: 'safetycontent/getOnlyShowEnclosureListByTaskIdAndIndex',
      payload: { taskId: taskId, index: 0 },
    })
  }

  onImageClick = (_index, file) => {
    Taro.previewImage({
      current: file.url,
      urls: [file.url],
    })
  }

  handleEdit = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'safetycontent/reStartTaskStep',
      payload: { taskId: this.state.taskId, index: 1 },
    })

    Taro.navigateTo({
      url: '/packageA/pages/safetycontent/next',
    })
  }

  openFile = file => {
    const filepath = Array.isArray(file) && file[0].fileUrl
    if (filepath == null || filepath == '') {
      Taro.showToast({
        title: '暂无安全交底文件',
        icon: 'none',
        duration: 1000,
      })
      return false
    }
    Taro.downloadFile({
      url: filepath,
      success: function (res) {
        var filePath = res.tempFilePath
        Taro.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
        })
      },
    })
  }

  componentWillUnmount() {
    // 自定义退回
    Taro.redirectTo({
      url: '/packageA/pages/project/index',
    })
  }

  render() {
    const { safetycontent } = this.props
    const { documentList, photos, onlyShowEnclosureList } = safetycontent
    let file =
      (Array.isArray(onlyShowEnclosureList) &&
        onlyShowEnclosureList.length > 0 &&
        onlyShowEnclosureList.filter(item => item.name == '安全交底文件')[0]
          .enclosureItems) ||
      []

    return (
      <View
        className="safety-content"
        style={{ height: 'auto', paddingBottom: '80px' }}
      >
        <View className="label" style={{ margin: '0 0 15px 0' }}>
          电子签名
        </View>
        <View>
          <AtImagePicker
            className="image-readonly"
            mode="top"
            files={documentList}
            customStyle={{ width: '320px' }}
            onImageClick={this.onImageClick}
            showAddBtn={false}
            onChange={() => {}}
          />
        </View>
        <View className="label" style={{ margin: '15px 0' }}>
          现场照片
        </View>
        <View>
          <AtImagePicker
            className="image-readonly"
            mode="top"
            files={photos}
            customStyle={{ width: '320px' }}
            onImageClick={this.onImageClick}
            showAddBtn={false}
            onChange={() => {}}
          />
        </View>
        <View
          style={{
            padding: '25px 0 0 10px',
            color: 'rgb(55, 146, 248)',
            fontSize: '16px',
          }}
        >
          <Text onClick={this.openFile.bind(this, file)}>安全交底文件</Text>
        </View>
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
