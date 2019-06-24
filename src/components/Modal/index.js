import React, { Component } from 'react'
import './index.less'
import { Icon } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('Store')
@observer
class ModalDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 组件内根据visible来显隐全局遮罩层
    if (nextProps.visible) {
      this.props.Store.isCover = true
    } else {
      this.props.Store.isCover = false
    }
    return true
  }
  render() {
    const { visible, title, width, top, backgroundColor, height, onCancel, children } = this.props
    return (
      <div className="modal-dialog" style={{ display: visible ? 'block' : 'none', width: width || '600px', marginTop: top || '200px' }}>
        <div className="dialog-header" style={{ backgroundColor: backgroundColor || '#004098FF' }}>
          <p style={{ lineHeight: height || '50px' }}>{ title || '标题' }</p>
          <Icon type="close" onClick={ onCancel } />
        </div>
        <div className="dialog-main">
          { children }
        </div>
      </div>
    )
  }
}

export default ModalDialog