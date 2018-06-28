import { Component } from 'react'
import { Modal } from 'antd'
import CateForm from './CateForm'

export default class CateModal extends Component {
  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.hideModal}
      >
        <CateForm
          cate={this.props.cate}
          handleInput={this.props.handleInput}
          handleSubmit={this.props.handleSubmit}
          hideModal={this.props.hideModal}
        />
      </Modal>
    )
  }
}
