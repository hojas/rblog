import { Component } from 'react'
import Head from 'next/head'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import Link from 'next/link'
import ajax from '../ajax'

export default class MainNavbar extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.logout = this.logout.bind(this)
    this.state = {
      isOpen: false,
      cates: [],
    }
  }

  async componentDidMount() {
    const currentUser = await ajax('users/current')
    if (currentUser.data.ok) {
      this.setState({
        user: currentUser.data.user,
      })
    }

    const res = await ajax('categories')
    if (res.data.ok) {
      this.setState({
        cates: res.data.categories,
      })
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  async logout(e) {
    e.preventDefault()

    const res = await ajax.get('users/logout')
    if (res.data.ok) {
      this.setState({
        user: {},
      })
    }
  }

  renderUser() {
    const user = this.props.user || this.state.user
    console.log(this.props.user)
    console.log(this.state.user)
    if (user && user.username) {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#">Hi, {user.username}</NavLink>
          </NavItem>
          {user.isAdmin ? (
            <NavItem>
              <Link href="/admin">
                <a className="nav-link">管理</a>
              </Link>
            </NavItem>
          ) : (
            ''
          )}
          <NavItem>
            <NavLink href="#" onClick={this.logout}>
              退出
            </NavLink>
          </NavItem>
        </Nav>
      )
    }
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link href="/signin">
            <a className="nav-link">登录</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/signup">
            <a className="nav-link">注册</a>
          </Link>
        </NavItem>
      </Nav>
    )
  }

  renderCates() {
    return this.state.cates.map(cate => (
      <NavItem key={cate.url}>
        <Link href={'/' + cate.url}>
          <a className="nav-link">{cate.name}</a>
        </Link>
      </NavItem>
    ))
  }

  render() {
    return (
      <div>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/css/bootstrap.min.css"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <Navbar color="light" light expand="md">
          <Link href="/">
            <a className="navbar-brand">前端日志网</a>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link href="/">
                  <a className="nav-link">首页</a>
                </Link>
              </NavItem>
              {this.renderCates()}
            </Nav>
            {this.renderUser()}
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
