import { Component } from 'react'
import { Button } from 'antd'
import Layout from '../../components/AdminLayout'
import ajax from '../../ajax'

export default class UserManagement extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const res = await ajax('users/all')
  }

  render() {
    return <Layout />
  }
}
