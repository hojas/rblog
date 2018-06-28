import { Component } from 'react'
import { Form, Input, Alert, Button } from 'antd'

const FormItem = Form.Item

class CateFormClass extends Component {
  render() {
    if (!this.props.handleInput) {
      return (
        <Form>
          <Alert
            message={'确定删除分类：' + this.props.cate.name + ' ？'}
            type="warning"
            style={{ marginBottom: '20px' }}
          />
          <Button
            type="primary"
            onClick={this.props.handleSubmit}
            style={{ marginRight: '8px' }}
          >
            确定
          </Button>
          <Button onClick={this.props.hideModal}>取消</Button>
        </Form>
      )
    }

    return (
      <Form onSubmit={e => this.props.handleSubmit(e)}>
        <FormItem label="名称">
          <Input
            value={this.props.cate.name}
            name="name"
            onChange={this.props.handleInput}
          />
        </FormItem>
        <FormItem label="URL">
          <Input
            value={this.props.cate.url}
            name="url"
            onChange={this.props.handleInput}
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '8px' }}
          >
            确定
          </Button>
          <Button onClick={this.props.hideModal}>取消</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(CateFormClass)
