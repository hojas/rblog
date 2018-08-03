import { Component } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import Router from 'next/router'
import { Layout, Menu, Icon } from 'antd'
import ajax from '../ajax'
import css from './styles/adminLayout.scss'

const { Header, Sider, Content } = Layout

export default class AdminLayout extends Component {
  state = {
    activeMenu: this.props.activeMenu || 'users',
    collapsed: false,
    statusCode: null,
  }

  pushRouter = ({ item, key, keyPath }) => {
    if (key === 'users') {
      Router.push(`/admin`)
    } else {
      Router.push(`/admin/${key}`)
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  async componentDidMount() {
    const currentUser = await ajax('users/current')
    if (currentUser.data.ok) {
      if (currentUser.data.user.isAdmin) {
        this.setState({
          statusCode: 200,
        })
      } else {
        this.setState({
          statusCode: 404,
        })
      }
    }
  }

  render() {
    const statusCode = this.state.statusCode
    if (statusCode === null) {
      return <div>页面加载中...</div>
    }
    if (statusCode === 404) {
      return <Error statusCode={statusCode} />
    }

    return (
      <Layout className={css['admin-layout']}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/antd@3.6.1/dist/antd.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/github-markdown-css@2.10.0/github-markdown.min.css"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={css.logo}>rblog</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.state.activeMenu]}
            onClick={this.pushRouter}
          >
            <Menu.Item key="users">
              <Icon type="user" />
              <span>用户</span>
            </Menu.Item>
            <Menu.Item key="categories">
              <Icon type="file" />
              <span>分类</span>
            </Menu.Item>
            <Menu.Item key="posts">
              <Icon type="file-text" />
              <span>文章</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={css.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 200,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
