import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.css'

export default class CountDownBtn extends Component {
    static options = {
        addGlobalClass: true
    }

    state = {
        clickStatus: 'normal',
        currSecord: 0
    }
    componentWillMount() {
        this.props.onRef(this)
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    clickAction = () => {
        this.props.click()
    }

    canSend = () => {
        return this.state.clickStatus === 'normal';
    }

    begin = () => {
        this.setState({
            currSecord: parseInt(this.props.secord),
            clickStatus: 'wait'
        }, () => {
            this.beginInterval();
        })

    }

    beginInterval = () => {
        this.setState({
            currSecord: this.state.currSecord - 1
        }, () => {
            if (this.state.currSecord <= 0) {
                this.setState({
                    clickStatus: 'normal'
                })
            } else {
                setTimeout(this.beginInterval, 1000);
            }
        })

    }

    render() {
        const { clickStatus, currSecord } = this.state
        const { normalClass, disabledClass, title, waitTitle } = this.props
        return (
            <View>
                <View onClick={this.clickAction} className={clickStatus === 'normal' ? normalClass : disabledClass}>{clickStatus === 'normal' ? title : waitTitle.replace('SECORD', currSecord)}</View>
            </View>
        )
    }
}
CountDownBtn.propTypes = {
    title: PropTypes.string,
    waitTitle: PropTypes.string,
    secord: PropTypes.number,
    normalClass: PropTypes.string,
    disabledClass: PropTypes.string
}
CountDownBtn.defaultProps = {
    title: '获取验证码',
    waitTitle: '稍等（SECORD）秒',
    secord: 60,
    normalClass: 'normal',
    disabledClass: 'disabled'
};

