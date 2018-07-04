import { Component } from 'react'
import marked from 'marked'
import Layout from '../components/Layout'
import ajax from '../ajax'
import styles from './styles/post.scss'

export default class PostPage extends Component {
  state = {
    post: {},
  }

  async componentDidMount() {
    const { id } = this.props.url.query
    const res = await ajax('posts/' + id)
    if (res.data.ok) {
      this.setState({
        post: res.data.post,
      })
    }
  }

  renderMarkup = html => ({ __html: html })

  render() {
    const post = this.state.post
    const content = marked(post.content || '')

    return (
      <Layout>
        <div className={styles.postTitle}>{post.title}</div>
        <div className={styles.postContent + " markdown-body"} dangerouslySetInnerHTML={this.renderMarkup(content)}></div>
      </Layout>
    )
  }
}
