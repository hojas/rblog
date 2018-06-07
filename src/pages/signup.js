import { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import ajax from '../ajax'
import Layout from '../components/Layout'
import css from './styles/sign.scss'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.signup = this.signup.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }

  async signup(e) {
    e.preventDefault()
    const res = await ajax.post('users/signup', this.state)
  }

  handleInput(e) {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Layout>
        <Form className={css.form} onSubmit={this.signup}>
          <FormGroup>
            <Label>用户名</Label>
            <Input type="text" name="username" onChange={this.handleInput} />
          </FormGroup>
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
          <FormGroup>
            <Label>确认密码</Label>
            <Input
              type="password"
              name="repassword"
              onChange={this.handleInput}
            />
          </FormGroup>
          <Button color="primary">注册</Button>
        </Form>
      </Layout>
    )
  }
}
