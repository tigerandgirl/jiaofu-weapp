/*
 * 安全交底 签名
 * dangwei@bocspace.cn
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import { SignaturePad } from '@yz1311/taro-signature-pad'

import './style.styl'
import Config from '../../../config'

type PageStateProps = {
  dispatch: Function
  safetycontent: any
}

type IProps = PageStateProps

interface Index {
  props: IProps
}

// @ts-ignore
@connect(
  state => ({
    safetycontent: state.safetycontent,
  }),
  dispatch => ({
    dispatch,
  })
)
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleCancle = () => {
    this.clear()
    Taro.navigateBack({
      delta: 1,
    })
  }

  save = () => {
    let _this = this
    const { dispatch, safetycontent } = _this.props
    const { stepState } = safetycontent
    const { taskId } = stepState

    const isEempyt = _this.signatureRef.isEmpty()
    if (isEempyt) {
      Taro.showToast({
        title: '签名是必填',
        icon: 'none',
      })
      return false
    }
    _this.signatureRef.toTempFilePath().then(filepath => {
      // 上传签名
      Taro.showLoading({
        title: '上传中...',
      })
      Taro.uploadFile({
        url: Config.multiUpload,
        filePath: filepath,
        name: 'file',
        header: {
          'Content-Type': 'multipart/form-data',
        },
        formData: {
          method: 'POST',
          fileType: 1,
        },
        success: function (res) {
          const file = JSON.parse(res.data).body[0]
          //console.log(file, "上传成功")

          let document = {
            id: '',
            name: file.fileName,
            taskId: taskId,
            fileUrl: file.fileURL,
            fileSize: 0,
            downloadCount: 0,
            ownerId: '',
            ownerName: '',
            orders: 0,
            isVisible: 1,
            category: 4, // 4 签名  2 现场照片
          }
          // console.log(document, "上传成功document")

          dispatch({
            type: 'safetycontent/updateDocument',
            payload: {
              d: document,
            },
          }).then(res => {
            if (res) {
              dispatch({
                type: 'safetycontent/getDocumentList',
                payload: {
                  taskId: taskId,
                },
              })

              Taro.navigateTo({
                url: '/packageA/pages/safetycontent/next',
              })

              /*Taro.navigateBack({
                delta: 1
              });*/
            }
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
    })
  }

  clear = () => {
    this.signatureRef.clear()
  }

  render() {
    return (
      <View style={{ width: '100vw', height: '100vh' }}>
        <SignaturePad
          className="signature-canvas"
          ref={node => (this.signatureRef = node)}
        />

        <View
          className="safetycontent-fixed"
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <AtButton
            size="small"
            customStyle={{ width: '68px', fontSize: '12px' }}
            type="secondary"
            onClick={this.clear}
          >
            重签
          </AtButton>
          <AtButton
            size="small"
            customStyle={{
              margin: '0 30px',
              color: '#FFF',
              width: '68px',
              fontSize: '12px',
            }}
            type="primary"
            onClick={this.save}
          >
            确定
          </AtButton>
          <AtButton
            size="small"
            customStyle={{ width: '68px', fontSize: '12px' }}
            type="secondary"
            onClick={this.handleCancle}
          >
            取消
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Index
