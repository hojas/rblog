import { Component } from 'react'
import Router from 'next/router'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import ajax from '../ajax'
import Layout from '../components/Layout'
import css from './styles/sign.scss'

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.signIn = this.signIn.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.state = {
      email: '',
      password: '',
      user: {},
    }
  }

  async signIn(event) {
    event.preventDefault()

    const res = await ajax.post('users/signin', this.state)
    if (res.data.ok) {
      this.setState({
        user: res.data.user,
      })
      Router.push('/')
    }
  }

  handleInput(event) {
    const target = event.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Layout user={this.state.user} logout={this.logout}>
        <Form className={css.form} onSubmit={this.signIn}>
          <FormGroup>
            <Label>邮箱</Label>
            <Input type="email" name="email" onChange={this.handleInput} />
          </FormGroup>
          <FormGroup>
            <Label>密码</Label>
            <Input
              type="password"
              name="password"
              onChange={this.handleInput}
            />
          </FormGroup>
          <Button color="primary">登录</Button>
        </Form>
      </Layout>
    )
  }
}
