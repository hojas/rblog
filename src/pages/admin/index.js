import { Component } from 'react'
import { Table } from 'antd'
import Layout from '../../components/AdminLayout'
import ajax from '../../ajax'

const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">删除</a>
    </span>
  )
}]

export default class UserManagement extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
    }
  }

  async componentDidMount() {
    const res = await ajax('users/all')
    if (res.data.ok) {
      this.setState({
        users: res.data.users,
      })
    }
  }

  render() {
    const users = this.state.users
    console.log(users)
    return (
      <Layout>
        <Table columns={columns} dataSource={users} />
      </Layout>
    )
  }
}
