import { Component } from 'react'
import marked from 'marked'
import { message, Button } from 'antd'
import Layout from '../../components/AdminLayout'
import ajax from '../../ajax'
import styles from './styles/editor.scss'

export default class PostEditor extends Component {
  state = {
    postId: null,
    content: '',
    contentMarked: '',
  }

  update = async e => {
    const { id } = this.props.url.query
    const post = {
      _id: id,
      content: this.state.content,
    }
    const res = await ajax.put('posts/content', post)
    if (res.data.ok) {
      message.success('保存成功')
    } else  {
      message.error('保存失败')
    }
  }

  handleChange = e => {
    this.setState({
      content: e.target.value,
      contentMarked: marked(e.target.value),
    })
  }

  async componentDidMount() {
    const { id } = this.props.url.query
    const res = await ajax('posts/' + id)

    if (res.data.ok) {
      this.setState({
        content: res.data.post.content,
        contentMarked: marked(res.data.post.content),
      })
    }
  }

  renderMarkup = html => ({ __html: html })

  render() {
    return (
      <Layout activeMenu="posts">
        <div style={{ marginBottom: '8px' }}>
          <Button onClick={this.update}>保存</Button>
        </div>
        <div className={styles.editorContainer}>
          <textarea
            className={styles.editor}
            value={this.state.content}
            onChange={this.handleChange}>
          </textarea>
          <div
            className={styles.viewer + ' markdown-body'}
            dangerouslySetInnerHTML={this.renderMarkup(this.state.contentMarked)}>
          </div>
        </div>
      </Layout>
    )
  }
}