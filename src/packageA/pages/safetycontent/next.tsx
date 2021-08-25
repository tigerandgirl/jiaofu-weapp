/*
 * 安全交底 签名
 * dangwei@bocspace.cn
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { AtButton, AtImagePicker } from 'taro-ui'
import { View } from '@tarojs/components'

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

  onImageClick = (_index, file) => {
    Taro.previewImage({
      current: file.url,
      urls: [file.url],
    })
  }

  // 上传
  onFileChange(v, doType, index) {
    // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    let that = this
    //const index = v.length - 1;
    const { safetycontent } = that.props
    const { photos } = safetycontent
    if (doType === 'remove') {
      that.setState(() => {
        return {
          files: v,
        }
      })

      // 删除
      let item = photos[index]
      const { id } = item
      if (id != undefined && id != null && id != '') {
        that.props
          .dispatch({
            type: 'safetycontent/delDocument',
            payload: {
              id: id,
            },
          })
          .then(res => {
            if (res) {
              that.props.dispatch({
                type: 'safetycontent/updateState',
                payload: {
                  photos: Object.assign([], v),
                },
              })
            }
          })
      } else {
        that.props.dispatch({
          type: 'safetycontent/updateState',
          payload: {
            photos: Object.assign([], v),
          },
        })
      }
    } else {
      // 新增
      that.setState(
        () => {
          return {
            files: v,
          }
        },
        () => {
          // 已经上传的
          const oldArray = photos.map(item => {
            return item.fileId
          })
          // 未上传的
          const newArray = v.filter(vitem => {
            if (!oldArray.includes(vitem.fileId)) {
              return vitem
            }
          })
          // console.log(v, '上传图片数', oldArray, newArray, photos)

          // 循环上传
          for (let i = 0; i < newArray.length; i++) {
            Taro.showLoading({
              title: '上传中...',
              icon: 'loading-2',
            })
            //上传图片
            Taro.uploadFile({
              url: Config.multiUpload,
              filePath: newArray[i].url,
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
                // 保存附件
                const attachments =
                  photos == null ? [] : JSON.parse(JSON.stringify(photos))

                attachments.push({
                  fileId: data[0].fileId,
                  fileName: data[0].fileName,
                  filePath: data[0].fileURL,
                  id: '',
                  url: data[0].fileURL,
                })

                that.props.dispatch({
                  type: 'safetycontent/updateState',
                  payload: {
                    photos: Object.assign(attachments),
                  },
                })

                // 保存接口
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
      )
    }
  }

  //签名
  handleNext = () => {
    Taro.navigateTo({
      url: '/packageA/pages/safetycontent/sign',
    })
  }

  onSubmit = () => {
    // 校验
    const { safetycontent, dispatch } = this.props
    const { documentList, photos, stepState } = safetycontent
    const { taskId } = stepState

    if (documentList.length == 0) {
      Taro.showToast({
        title: '签名是必填',
        icon: 'none',
      })
      return false
    }
    if (photos.length == 0) {
      Taro.showToast({
        title: '现场照片是必填',
        icon: 'none',
      })
      return false
    }
    if (photos.length > 0) {
      let phoyos = JSON.parse(JSON.stringify(photos))
      let phoyo = phoyos.map(item => {
        return {
          id: item.id,
          name: item.fileName,
          taskId: taskId,
          fileUrl: item.url,
          fileSize: 0,
          downloadCount: 0,
          ownerId: '',
          ownerName: '',
          orders: 0,
          isVisible: 1,
          category: 2, // 4 签名  2 现场照片
        }
      })

      dispatch({
        type: 'safetycontent/updateDocuments',
        payload: {
          ds: phoyo,
        },
      }).then(res => {
        if (res) {
          dispatch({
            type: 'safetycontent/getDocumentList',
            payload: {
              taskId: taskId,
            },
          })
        }
      })
    }

    // 完成
    dispatch({
      type: 'safetycontent/overTaskStep',
      payload: {
        taskId: taskId,
        index: 1,
      },
    }).then(res => {
      if (res) {
        // 跳转到详情页
        Taro.navigateTo({
          url: '/packageA/pages/safetycontent/view',
        })
      }
    })
  }

  onFileDel = (files, operationType, index) => {
    //console.log(files, operationType, index, "删除")
    const { dispatch, safetycontent } = this.props
    const { documentList } = safetycontent

    if (operationType == 'remove') {
      let item = documentList[index]
      const { id } = item

      dispatch({
        type: 'safetycontent/delDocument',
        payload: {
          id: id,
        },
      }).then(res => {
        if (res) {
          dispatch({
            type: 'safetycontent/updateState',
            payload: {
              documentList: Object.assign([], files),
            },
          })
        }
      })
    }
  }

  render() {
    const { safetycontent } = this.props
    const { documentList, photos } = safetycontent

    return (
      <View className="safety-content" style={{ height: 'auto' }}>
        <View className="label" style={{ margin: '0 0 15px 0' }}>
          电子签名
        </View>
        <View
          className="safety-content-sign"
          onClick={this.handleNext}
          style={{ display: 'inline-block' }}
        >
          +
        </View>
        <View style={{ display: 'inline-block' }}>
          <AtImagePicker
            files={documentList}
            customStyle={{ width: '320px' }}
            onImageClick={this.onImageClick}
            showAddBtn={false}
            onChange={this.onFileDel.bind(this)}
          />
        </View>
        <View className="label" style={{ margin: '15px 0' }}>
          现场照片
        </View>
        <View>
          <AtImagePicker
            mode="top"
            files={photos}
            customStyle={{ width: '320px' }}
            onImageClick={this.onImageClick}
            onChange={this.onFileChange.bind(this)}
          />
        </View>
        <View className="stakeholder-fixed">
          <AtButton
            onClick={this.onSubmit}
            size="small"
            customStyle={{ width: '40%', marginTop: '8px' }}
            type="primary"
          >
            完成交底
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Index
