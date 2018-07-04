import { Component } from 'react'
import { Form, Input, Select, Alert, Button } from 'antd'
import ajax from '../../ajax'

const FormItem = Form.Item

class PostForm extends Component {
  state = {
    cates: [],
  }

  renderCates = () => {
    return this.state.cates.map(cate => (
      <Select.Option value={cate.url} key={cate.url}>
        {cate.name}
      </Select.Option>
    ))
  }

  async componentDidMount() {
    const res = await ajax('categories')
    if (res.data.ok) {
      this.setState({
        cates: res.data.categories,
      })
    }
  }

  render() {
    if (!this.props.handleInput) {
      return (
        <Form>
          <Alert
            message={'确定删除文章：' + this.props.post.title + ' ？'}
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
        <FormItem label="标题">
          <Input
            name="title"
            value={this.props.post.title}
            onChange={this.props.handleInput}
          />
        </FormItem>
        <FormItem label="分类">
          <Select
            name="category"
            defaultValue={
              this.props.post.category && this.props.post.category.url
            }
            onChange={this.props.handleInput}
          >
            {this.renderCates()}
          </Select>
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

export default Form.create()(PostForm)
