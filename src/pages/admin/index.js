import { Component } from 'react'
import { Table } from 'antd'
import Layout from '../../components/AdminLayout'
import ajax from '../../ajax'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '角色',
    dataIndex: 'isAdmin',
    key: 'isAdmin',
    render: (text, record) => (
      <span>{record.isAdmin ? '管理员' : '普通用户'}</span>
    ),
  },
]

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

    return (
      <Layout>
        <Table columns={columns} dataSource={users} />
      </Layout>
    )
  }
}
