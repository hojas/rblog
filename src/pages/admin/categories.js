import { Component } from 'react'
import { Table, Button, Divider } from 'antd'
import Layout from '../../components/AdminLayout'
import CateModal from '../../components/admin/CateModal'
import ajax from '../../ajax'

const columns = _this => [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
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
        <a href="javascript:;" onClick={() => _this.toggleRemoveModal(record)}>
          删除
        </a>
      </span>
    ),
  },
]

export default class UserManagement extends Component {
  state = {
    visibleAddModal: false,
    visibleUpdateModal: false,
    visibleRemoveModal: false,
    cate: {},
    cates: [],
  }

  toggleAddModal = () => {
    this.setState({
      visibleAddModal: !this.state.visibleAddModal,
    })
  }

  toggleUpdateModal = (cate = this.state.cate) => {
    this.setState({
      visibleUpdateModal: !this.state.visibleUpdateModal,
      cate,
    })
  }

  toggleRemoveModal = (cate = this.state.cate) => {
    this.setState({
      visibleRemoveModal: !this.state.visibleRemoveModal,
      cate,
    })
  }

  add = async e => {
    e.preventDefault()

    const res = await ajax.post('categories', {
      ...this.state.cate,
    })
    if (res.data.ok) {
      await this.getCates()
    }
    this.toggleAddModal()
  }

  update = async e => {
    e.preventDefault()

    const res = await ajax.put('categories', {
      ...this.state.cate,
    })
    if (res.data.ok) {
      await this.getCates()
    }
    this.toggleUpdateModal()
  }

  remove = async e => {
    e.preventDefault()

    const res = await ajax.delete('categories', {
      params: {
        ...this.state.cate,
      },
    })
    if (res.data.ok) {
      await this.getCates()
    }
    this.toggleRemoveModal()
  }

  handleInput = e => {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      cate: {
        ...this.state.cate,
        [name]: value,
      },
    })
  }

  getCates = async () => {
    const res = await ajax('categories')
    if (res.data.ok) {
      this.setState({
        cates: res.data.categories,
      })
    }
  }

  componentDidMount() {
    this.getCates()
  }

  render() {
    const cates = this.state.cates

    return (
      <Layout activeMenu="categories">
        <div style={{ marginBottom: '16px' }}>
          <Button onClick={this.toggleAddModal}>添加分类</Button>
        </div>
        <Table columns={columns(this)} dataSource={cates} />
        <CateModal
          title="添加分类"
          visible={this.state.visibleAddModal}
          cate={this.state.cate}
          hideModal={this.toggleAddModal}
          handleInput={this.handleInput}
          handleSubmit={this.add}
        />
        <CateModal
          title="更新分类"
          visible={this.state.visibleUpdateModal}
          cate={this.state.cate}
          hideModal={this.toggleUpdateModal}
          handleInput={this.handleInput}
          handleSubmit={this.update}
        />
        <CateModal
          title="删除分类"
          visible={this.state.visibleRemoveModal}
          cate={this.state.cate}
          hideModal={this.toggleRemoveModal}
          handleInput={null}
          handleSubmit={this.remove}
        />
      </Layout>
    )
  }
}
