import { Component } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import ajax from '../ajax'

export default class CategoryPage extends Component {
  state = {
    posts: [],
  }

  async componentDidMount() {
    const { category } = this.props.url.query
    const res = await ajax('posts', {
      params: {
        category,
      }
    })
    if (res.data.ok) {
      this.setState({
        posts: res.data.posts,
      })
    }
  }

  renderPosts = () => {
    return this.state.posts.map(post => {
      return <Link href={"/posts/" + post._id} key={post._id}>
        <a className="list-group-item list-group-item-action">{post.title}</a>
      </Link>
    })
  }

  render() {
    return (
      <Layout>
        <div className="list-group" style={{ margin: '10px 0' }}>
          {this.renderPosts()}
        </div>
      </Layout>
    )
  }
}
