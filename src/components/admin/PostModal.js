import { Component } from 'react'
import { Modal } from 'antd'
import PostForm from './PostForm'

export default class PostModal extends Component {
  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.hideModal}
      >
        <PostForm
          post={this.props.post}
          handleInput={this.props.handleInput}
          handleSubmit={this.props.handleSubmit}
          hideModal={this.props.hideModal}
        />
      </Modal>
    )
  }
}
