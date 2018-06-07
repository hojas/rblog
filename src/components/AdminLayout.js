import { Component } from 'react'
import Head from 'next/head'
import { Layout, Menu, Icon } from 'antd'
import css from './styles/adminLayout.scss'

const { Header, Sider, Content } = Layout

export default class AdminLayout extends Component {
  constructor(props) {
    super(props)

    this.activeMenu = props.activeMenu || 'user'
    this.toggle = this.toggle.bind(this)
    this.state = {
      collapsed: false,
    }
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    return (
      <Layout className={css['admin-layout']}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/antd@3.6.1/dist/antd.min.css"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={css.logo} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={this.activeMenu}
          >
            <Menu.Item key="user">
              <Icon type="user" />
              <span>用户</span>
            </Menu.Item>
            <Menu.Item key="cate">
              <Icon type="file" />
              <span>分类</span>
            </Menu.Item>
            <Menu.Item key="post">
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
