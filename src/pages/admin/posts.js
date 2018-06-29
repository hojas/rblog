import { Component } from 'react'
import Link from 'next/link'
import { Table, Button, Divider } from 'antd'
import Layout from '../../components/AdminLayout'
import PostModal from '../../components/admin/PostModal'
import ajax from '../../ajax'

const columns = _this => [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    render: (text, record) => (
      <span>{record.category.name}</span>
    )
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    render: (text, record) => (
      <span>{record.author.username}</span>
    )
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;" onClick={() => _this.toggleUpdateModal(record)}>
          更改
        </a>
        <Divider type="vertical" />
        <Link href="/admin/edit">
          编辑内容
        </Link>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={() => _this.toggleRemoveModal(record)}>
          删除
        </a>
      </span>
    ),
  },
]

export default class PostManagement extends Component {
  state = {
    visibleAddModal: false,
    visibleUpdateModal: false,
    visibleRemoveModal: false,
    post: {},
    posts: [],
  }

  toggleAddModal = () => {
    this.setState({
      visibleAddModal: !this.state.visibleAddModal,
    })
  }

  toggleUpdateModal = (post = this.state.post) => {
    this.setState({
      visibleUpdateModal: !this.state.visibleUpdateModal,
      post,
    })
  }

  toggleRemoveModal = (post = this.state.post) => {
    this.setState({
      visibleRemoveModal: !this.state.visibleRemoveModal,
      post,
    })
  }

  add = async e => {
    e.preventDefault()

    const res = await ajax.post('posts', {
      ...this.state.post,
    })
    if (res.data.ok) {
      await this.getPosts()
    }
    this.toggleAddModal()
  }

  update = async e => {
    e.preventDefault()

    const res = await ajax.put('posts', {
      params: {
        ...this.state.post,
      }
    })
    if (res.data.ok) {
      await this.getPosts()
    }
    this.toggleUpdateModal()
  }

  remove = async e => {
    e.preventDefault()

    const res = await ajax.delete('posts', {
      params: {
        ...this.state.post,
      }
    })
    if (res.data.ok) {
      await this.getPosts()
    }
    this.toggleRemoveModal()
  }

  handleInput = e => {
    let data = {}
    if (typeof e === 'string') {
      data.category = e
    } else {
      const target = e.target
      const name = target.name
      const value = target.value
      data[name] = value
    }
    this.setState({
      post: {
        ...this.state.post,
        ...data,
      },
    })
  }

  getPosts = async () => {
    const res = await ajax('posts')
    if (res.data.ok) {
      this.setState({
        posts: res.data.posts,
      })
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  render() {
    const posts = this.state.posts

    return (
      <Layout activeMenu="posts">
        <div style={{ marginBottom: '8px' }}>
          <Button onClick={this.toggleAddModal}>添加文章</Button>
        </div>
        <Table columns={columns(this)} dataSource={posts} />
        <PostModal
          title="添加文章"
          visible={this.state.visibleAddModal}
          post={this.state.post}
          hideModal={this.toggleAddModal}
          handleInput={this.handleInput}
          handleSubmit={this.add}
        />
        <PostModal
          title="更新文章"
          visible={this.state.visibleUpdateModal}
          post={this.state.post}
          hideModal={this.toggleUpdateModal}
          handleInput={this.handleInput}
          handleSubmit={this.update}
        />
        <PostModal
          title="删除文章"
          visible={this.state.visibleRemoveModal}
          post={this.state.post}
          hideModal={this.toggleRemoveModal}
          handleInput={null}
          handleSubmit={this.remove}
        />
      </Layout>
    )
  }
}
