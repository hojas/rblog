import React, { Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>邮箱</label>
                    <Field type="email" component="input" className="form-control" name="email" />
                </div>
                <div className="form-group">
                    <label>密码</label>
                    <Field type="password" component="input" className="form-control" name="password" />
                </div>
                <button type="submit" className="btn btn-success">登录</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login'
})(Login);

